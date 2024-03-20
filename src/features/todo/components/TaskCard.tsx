"use client";
import React from "react";

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

type StatusProps = "important" | "completed";

const TaskCard: React.FC<TasksDataProps> = ({
  _id,
  completed,
  important,
  title,
}) => {
  const { tasksData, updateTasksData } = useTasksDataState();

  const setTaskStatusHandler = async (status: StatusProps) => {
    const updateTaskEndpoint = `/app/task/${_id}`;

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

  return (
    <>
      <article
        className="flex justify-between w-full px-2 py-4 rounded-lg "
        style={{ backgroundColor: "rgba(256 256 256 / 40%)" }}
      >
        <div className="z-10 flex space-x-2">
          <button onClick={() => setTaskStatusHandler("completed")}>
            {completed ? <CheckDarkCircle /> : <CiCircleCheck size={23} />}
          </button>

          <h3 className={`${completed ? "line-through" : ""} font-medium`}>
            {title}
          </h3>
        </div>

        <div className="flex space-x-3 bg-gr">
          {important ? (
            <button onClick={() => setTaskStatusHandler("important")}>
              <FaStar size={20} fill="#e4b355" />
            </button>
          ) : (
            <button onClick={() => setTaskStatusHandler("important")}>
              <CiStar size={23} />
            </button>
          )}

          <HiOutlineDotsHorizontal
            size={23}
            stroke="rgb(156, 163, 175)"
            style={{ cursor: "pointer" }}
          />
        </div>
      </article>
    </>
  );
};

export default TaskCard;
