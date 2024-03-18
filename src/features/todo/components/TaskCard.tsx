import React from "react";
import { CiCircleCheck } from "react-icons/ci";

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const TaskCard = () => {
  return (
    <>
      <article
        className="flex justify-between w-full px-2 py-4 rounded-lg "
        style={{ backgroundColor: "rgba(256 256 256 / 40%)" }}
      >
        <div className="z-10 flex space-x-2">
          <CiCircleCheck size={23} />
          <h3 className="font-medium">Go to school</h3>
        </div>
        <div className="flex space-x-3 bg-gr">
          {/* <CiStar size={23} fill="#e4b355" /> */}
          <FaStar size={20} fill="#e4b355" />
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
