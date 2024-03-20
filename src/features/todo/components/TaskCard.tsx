"use client";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { toastSuccess } from "@/shared/utils/toastAlert";

type TaskCardProps = {
  _id: string;
  title: string;
  completed: boolean;
  important: boolean;
};

type StatusProps = "important" | "completed";

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  completed,
  important,
  title,
}) => {
  const setTaskStatusHandler = async (status: StatusProps) => {
    try {
      if (status === "important") {
        const response = await api.patch(`/app/task/${_id}`, {
          important: !important,
        });

        if (response.status === 200) {
          toastSuccess(response.data.message);
        }
        return;
      }

      if (status === "completed") {
        const response = await api.patch(`/app/task/${_id}`, {
          completed: !completed,
        });

        if (response.status === 200) {
          toastSuccess(response.data.message);
        }
        return;
      }
    } catch (error) {
      apiResponseErrors(error);
    }
  };

  const setCompletedTaskHandler = (_id: string) => {};

  return (
    <>
      <article
        className="flex justify-between w-full px-2 py-4 rounded-lg "
        style={{ backgroundColor: "rgba(256 256 256 / 40%)" }}
      >
        <div className="z-10 flex space-x-2">
          <CiCircleCheck size={23} />
          <h3 className={`${completed ? "line-through" : ""} font-medium`}>
            {title}
          </h3>
        </div>
        <div className="flex space-x-3 bg-gr">
          {important ? (
            <FaStar size={20} fill="#e4b355" />
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
