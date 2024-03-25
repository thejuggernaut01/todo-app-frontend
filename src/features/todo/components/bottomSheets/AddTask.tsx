"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import Button from "@/shared/components/Form/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AddTaskType, taskZodValidator } from "../../utils/todoValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/shared/utils/api";
import FormInput from "@/shared/components/Form/FormInput";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { useTasksDataState } from "../../store/tasksData";
import { toastSuccess } from "@/shared/utils/toastAlert";
import { useAddTaskState } from "../../store/addTask";

type AddTaskProps = {
  windowWidth: number;
};

const AddTask: React.FC<AddTaskProps> = ({ windowWidth }) => {
  const { tasksData, updateTasksData } = useTasksDataState();
  const { isOpen: openAddTask, setIsOpen: setOpenAddTask } = useAddTaskState();

  const transition = {
    duration: 0.6,
    type: "spring",
    damping: 14,
  };

  const defaultValues = {
    title: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AddTaskType>({
    resolver: zodResolver(taskZodValidator("addTask")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<AddTaskType> = async (data: AddTaskType) => {
    const { title, description } = data;
    try {
      const response = await api.post("/todo/task", {
        title,
        description,
      });

      // update task data
      const newTaskData = [...tasksData, response.data.data];
      updateTasksData(newTaskData);
      setOpenAddTask(false);

      toastSuccess(response.data.message);
    } catch (error) {
      apiResponseErrors(error);
    }
    reset();
  };

  return (
    <>
      <main className="flex-1 rounded-md">
        <motion.aside className="fixed inset-0 z-10 flex items-end justify-end w-full bg-opacity-25 backdrop-brightness-50 md:items-center">
          <motion.div
            className="flex items-end justify-end w-full md:items-center"
            exit={{ opacity: 0.5, y: "110%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white w-full rounded-t-3xl md:rounded-xl md:w-[55%] lg:w-[40%] 2xl:w-[35%] min-w-[30%] mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={transition}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (windowWidth <= 768) {
                  if (info.offset.y > 300) setOpenAddTask(!openAddTask);
                }
              }}
            >
              <div className="w-[85%] mx-auto mt-2 md:mt-4 mb-10 md:mb-5">
                <button
                  className="flex justify-end w-full"
                  onClick={() => setOpenAddTask(!openAddTask)}
                >
                  <Image
                    src="/icons/closeModal.svg"
                    width={40}
                    height={40}
                    alt="Close Modal Icon"
                    className="text-right"
                  />
                </button>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSubmit(onSubmit)(event);
                  }}
                  action=""
                  className="mt-5 space-y-4"
                >
                  <div className="space-y-1">
                    <FormInput
                      placeholder="Task title"
                      type="text"
                      id="taskTitle"
                      defaultValue={defaultValues.title}
                      {...register("title")}
                    />
                    {errors && errors.title ? (
                      <p className="text-xs text-red-600">
                        {errors.title?.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <textarea
                      id="description"
                      cols={30}
                      rows={10}
                      className="w-full pt-2 pl-2 text-sm border rounded-lg resize-none h-44 outline-2 outline-black focus-visible:outline-black md:text-lg placeholder:text-base"
                      placeholder="Enter task description (make it as short as possible)"
                      {...register("description")}
                    ></textarea>

                    {errors && errors.description ? (
                      <p className="text-xs text-red-600">
                        {errors.description?.message}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    text="Add task"
                    type="submit"
                    extraClass="bg-primary"
                    isSubmitting={isSubmitting}
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        </motion.aside>
      </main>
    </>
  );
};

export default AddTask;
