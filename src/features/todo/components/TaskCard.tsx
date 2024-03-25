"use client";
import React, { useState } from "react";

import { CiCircleCheck } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { toastSuccess } from "@/shared/utils/toastAlert";
import { useTasksDataState } from "../store/tasksData";

import { TasksDataProps } from "@/shared/types/task";
import { CheckDarkCircle } from "./Svg";

import { Button } from "@/shared/UI/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/UI/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/UI/ui/popover";

type StatusProps = "important" | "completed";

const TaskCard: React.FC<TasksDataProps> = ({
  _id,
  completed,
  important,
  title,
  description,
  onClick,
}) => {
  const { tasksData, updateTasksData } = useTasksDataState();
  const [isLoading, setIsLoading] = useState(false);

  const setTaskStatusHandler = async (status: StatusProps) => {
    const updateTaskEndpoint = `/todo/task/${_id}`;

    try {
      if (status === "important") {
        // make api request
        const response = await api.patch(updateTaskEndpoint, {
          important: !important,
        });

        // get the index of the task to be altered from tasksData
        const alteredTaskDataIndex = tasksData.findIndex((task) => {
          return task._id === _id;
        });

        // save the new altered data
        const newAlteredTaskData = response.data.data as TasksDataProps;

        // using the altered data index,
        // update the alteredTask with the new alterted data
        tasksData[alteredTaskDataIndex] = newAlteredTaskData;

        // update the tasks data array
        updateTasksData(tasksData);

        if (response.status === 200) {
          toastSuccess(response.data.message);
        }
        return;
      }

      if (status === "completed") {
        const response = await api.patch(updateTaskEndpoint, {
          completed: !completed,
        });

        // get the index of the task to be altered from tasksData
        const alteredTaskDataIndex = tasksData.findIndex((task) => {
          return task._id === _id;
        });

        // save the new altered data
        const newAlteredTaskData = response.data.data as TasksDataProps;

        // using the altered data index,
        // update the alteredTask with the new alterted data
        tasksData[alteredTaskDataIndex] = newAlteredTaskData;

        // update the tasks data array
        updateTasksData(tasksData);

        if (response.status === 200) {
          toastSuccess(response.data.message);
        }
        return;
      }
    } catch (error) {
      apiResponseErrors(error);
    }
  };

  const deleteTaskHandler = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/app/task/${_id}`);

      const newTasksData = tasksData.filter((task) => {
        return task._id !== _id;
      });

      // update the tasks data array
      updateTasksData(newTasksData);

      toastSuccess(response.data.message);
    } catch (error) {
      apiResponseErrors(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <TooltipProvider>
        <article
          className="flex justify-between w-full p-2 rounded-lg "
          style={{ backgroundColor: "rgba(256 256 256 / 40%)" }}
        >
          <div className="z-10 flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setTaskStatusHandler("completed")}>
                  {completed ? (
                    <CheckDarkCircle />
                  ) : (
                    <CiCircleCheck size={23} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as {completed ? "uncompleted" : "completed"}</p>
              </TooltipContent>
            </Tooltip>

            <h3 className={`${completed ? "line-through" : ""} font-medium`}>
              {title}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setTaskStatusHandler("important")}>
                  {important ? (
                    <FaStar size={20} fill="#e4b355" />
                  ) : (
                    <CiStar size={23} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as {important ? "unimportant" : "important"}</p>
              </TooltipContent>
            </Tooltip>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <HiOutlineDotsHorizontal
                    size={23}
                    stroke="rgb(156, 163, 175)"
                    style={{ cursor: "pointer" }}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-52 absolute -left-[180px] md:-left-[150px]"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                }}
              >
                <aside className="flex flex-col space-y-1 text-sm">
                  <button
                    className="text-start hover:bg-[#ffffff] p-2 hover:rounded-lg"
                    onClick={onClick}
                  >
                    <p>Open task</p>
                  </button>

                  <button
                    className="text-start hover:bg-[#ffffff] p-2 hover:rounded-lg"
                    onClick={() => setTaskStatusHandler("completed")}
                  >
                    <p>Mark as {completed ? "uncompleted" : "completed"}</p>
                  </button>

                  <button
                    className="text-start hover:bg-[#ffffff] p-2 hover:rounded-lg"
                    onClick={() => setTaskStatusHandler("important")}
                  >
                    Mark as {important ? "unimportant" : "important"}
                  </button>

                  <button
                    className="p-2 text-red-700 text-start hover:bg-red-300 hover:rounded-lg"
                    onClick={() => deleteTaskHandler()}
                  >
                    {isLoading ? <p>.....</p> : <p>Delete task</p>}
                  </button>
                </aside>
              </PopoverContent>
            </Popover>
          </div>
        </article>
      </TooltipProvider>
    </>
  );
};

export default TaskCard;
