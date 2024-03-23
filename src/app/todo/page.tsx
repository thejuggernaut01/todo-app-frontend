"use client";

import React, { useState, useEffect } from "react";
import ContainerLayout from "@/shared/layouts/ContainerLayout";

import styles from "@/features/todo/styles/GradientBG.module.css";
import TaskCard from "@/features/todo/components/TaskCard";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { useTasksDataState } from "@/features/todo/store/tasksData";
import Button from "@/shared/components/Form/Button";
import { toastSuccess } from "@/shared/utils/toastAlert";

const TodoApp = () => {
  const { tasksData, updateTasksData } = useTasksDataState();
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/app/tasks");
        updateTasksData(response.data.data);
      } catch (error) {
        apiResponseErrors(error);
      }
    };

    fetchTasks();
  }, []);

  const addNewTaskHandler = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/app/task", {
        title: taskTitle,
      });

      // update task data
      const newTaskData = [...tasksData, response.data.data];
      updateTasksData(newTaskData);

      setTaskTitle("");
      toastSuccess(response.data.message);
    } catch (error) {
      apiResponseErrors(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <main className={styles.gradient}>
        <ContainerLayout>
          <section className="space-y-5 pt-5 sm:pt-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center">
              Todo App
            </h1>

            <section className="flex flex-col justify-between">
              <div className="space-y-8">
                <article className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Important
                  </h2>

                  <div className="space-y-2 overflow-y-auto">
                    {tasksData.length > 0 ? (
                      tasksData.map(({ _id, completed, important, title }) => {
                        if (important) {
                          return (
                            <TaskCard
                              key={`${_id}`}
                              _id={`${_id}`}
                              title={title}
                              completed={completed}
                              important={important}
                            />
                          );
                        }
                      })
                    ) : (
                      <p className="text-gray-700 text-sm md:text-base text-center font-semibold">
                        No important items yet!
                      </p>
                    )}
                  </div>
                </article>

                <article className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Task
                  </h2>

                  <div className="space-y-2 overflow-y-auto">
                    {tasksData.length > 0 ? (
                      tasksData.map(({ _id, completed, important, title }) => {
                        if (!important) {
                          return (
                            <TaskCard
                              key={`${_id}`}
                              _id={`${_id}`}
                              title={title}
                              completed={completed}
                              important={important}
                            />
                          );
                        }
                      })
                    ) : (
                      <p className="text-gray-700 text-sm md:text-base text-center font-semibold">
                        No todo items yet!
                      </p>
                    )}
                  </div>
                </article>
              </div>

              <article className="flex mt-10 my-5">
                <input
                  type="text"
                  className="w-full h-12 pl-4 rounded-l-lg"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />

                <div className="h-12 bg-[#1E212F] flex items-center px-5 rounded-r-lg gap-x-2">
                  <p className="text-2xl font-light text-white">+</p>
                  <Button
                    text="Add"
                    type="submit"
                    isSubmitting={isLoading}
                    extraClass="h-full text-white whitespace-nowrap border-none bg-transparent"
                    onClick={() => addNewTaskHandler()}
                  />
                </div>
              </article>
            </section>
          </section>
        </ContainerLayout>
      </main>
    </>
  );
};

export default TodoApp;
