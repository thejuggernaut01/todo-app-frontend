"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ContainerLayout from "@/shared/layouts/ContainerLayout";
import styles from "@/features/todo/styles/GradientBG.module.css";
import TaskCard from "@/features/todo/components/TaskCard";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { useTasksDataState } from "@/features/todo/store/tasksData";
import Button from "@/shared/components/Form/Button";
import { toastSuccess } from "@/shared/utils/toastAlert";
import Loader from "@/shared/components/Loader/Loader";
import AddTask from "@/features/todo/components/bottomSheets/AddTask";
import { useWindowWidthState } from "@/shared/store/windowWidth";
import {
  useAddTaskState,
  useViewTaskState,
} from "@/features/todo/store/addTask";
import { AnimatePresence } from "framer-motion";
import ViewTask from "@/features/todo/components/bottomSheets/ViewTask";

const TodoApp = () => {
  const router = useRouter();
  const { tasksData, updateTasksData } = useTasksDataState();
  const [logout, setLogout] = useState(false);

  const { windowWidth, updatewindowWidth } = useWindowWidthState();
  const { isOpen, setIsOpen } = useAddTaskState();
  const { isOpen: openViewTask, setIsOpen: setOpenViewTask } =
    useViewTaskState();

  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      updatewindowWidth(newWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Call it initially to set the initial width
    handleResize();

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/todo/tasks");
        updateTasksData(response.data.data);
      } catch (error) {
        apiResponseErrors(error);
      }
    };

    fetchTasks();
  }, []);

  const logoutHandler = async () => {
    setLogout(true);
    try {
      const response = await api.post("/auth/logout");

      toastSuccess(response.data.message);
      router.push("/");
    } catch (error) {
      apiResponseErrors(error);
    }
    setLogout(false);
  };

  return (
    <>
      <main className={styles.gradient}>
        <ContainerLayout>
          <section className="pt-5 space-y-5 sm:pt-10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold sm:text-3xl">Todo App</h1>
              <button
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-full"
                onClick={() => logoutHandler()}
              >
                {logout ? <Loader /> : "Log out"}
              </button>
            </div>

            <section className="flex flex-col justify-between gap-y-12 md:gap-y-24">
              <div className="space-y-8">
                <article className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                    Important
                  </h2>

                  <div className="space-y-2 overflow-y-auto">
                    {tasksData.length > 0 ? (
                      tasksData.map(
                        ({ _id, completed, important, title, description }) => {
                          if (important) {
                            return (
                              <TaskCard
                                key={`${_id}`}
                                _id={`${_id}`}
                                title={title}
                                description={description}
                                completed={completed}
                                important={important}
                                onClick={() => {
                                  setTaskId(_id);
                                  setOpenViewTask(true);
                                }}
                              />
                            );
                          }
                        }
                      )
                    ) : (
                      <p className="text-sm font-semibold text-center text-gray-700 md:text-base">
                        No important items yet!
                      </p>
                    )}
                  </div>
                </article>

                <article className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                    Task
                  </h2>

                  <div className="space-y-2 overflow-y-auto">
                    {tasksData.length > 0 ? (
                      tasksData.map(
                        ({ _id, completed, important, title, description }) => {
                          if (!important) {
                            return (
                              <TaskCard
                                key={`${_id}`}
                                _id={`${_id}`}
                                title={title}
                                description={description}
                                completed={completed}
                                important={important}
                                onClick={() => {
                                  setTaskId(_id);
                                  setOpenViewTask(true);
                                }}
                              />
                            );
                          }
                        }
                      )
                    ) : (
                      <p className="text-sm font-semibold text-center text-gray-700 md:text-base">
                        No todo items yet!
                      </p>
                    )}
                  </div>
                </article>
              </div>

              <div className="w-[70%] mx-auto">
                <Button
                  text="Add task"
                  type="submit"
                  extraClass="text-white whitespace-nowrap border-none py-4 bg-[#1E212F]"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </section>
          </section>
        </ContainerLayout>
      </main>

      <AnimatePresence>
        {isOpen && <AddTask windowWidth={windowWidth} />}
      </AnimatePresence>

      <AnimatePresence>
        {openViewTask && <ViewTask id={taskId} />}
      </AnimatePresence>
    </>
  );
};

export default TodoApp;
