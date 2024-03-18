"use client";

import React, { useState, useEffect } from "react";
import ContainerLayout from "@/shared/layouts/ContainerLayout";

import styles from "@/features/todo/styles/GradientBG.module.css";
import TaskCard from "@/features/todo/components/TaskCard";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { useUserDataState } from "@/features/todo/store/userData";
import Button from "@/shared/components/Form/Button";
import { toastSuccess } from "@/shared/utils/toastAlert";

const TodoApp = () => {
  const { userData, updateUserData } = useUserDataState();
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/app/tasks");
        console.log(response.data.data);

        updateUserData(response.data.data);
      } catch (error) {
        console.log(error);

        apiResponseErrors(error);
      }
    };

    fetchTasks();
  }, []);

  const addNewTask = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/app/task", {
        title: taskTitle,
      });

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
          <section className="space-y-5 my-14">
            <h1 className="text-3xl font-semibold text-center">Todo App</h1>

            <section className="h-[620px] flex flex-col justify-between py-5">
              <div className="space-y-8">
                {!userData && (
                  <article className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Important
                    </h2>

                    <TaskCard />
                  </article>
                )}

                <article className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-800">Task</h2>
                  {/* {!userData && (
                    <div className="text-gray-700 text-center font-semibold">
                      No todo items yet!
                    </div>
                  )} */}
                  {!userData ? (
                    <TaskCard />
                  ) : (
                    <div className="text-gray-700 text-center font-semibold">
                      No todo items yet!
                    </div>
                  )}
                </article>
              </div>

              <article className="flex">
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
                    onClick={() => addNewTask()}
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
