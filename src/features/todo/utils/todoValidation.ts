import { z } from "zod";

type TodoType = "addTask";

type AddTaskProps = {
  title: string;
  description: string;
};

// Zod validation for a task
const addTaskSchema: z.ZodType<AddTaskProps> = z.object({
  title: z
    .string({ required_error: "This field is required." })
    .min(3, { message: "Task title must be at least 3 characters long." })
    .max(15, { message: "Task title must be less than 15 characters." }),
  description: z
    .string({ required_error: "This field is required." })
    .min(3, { message: "Task description must be at least 3 characters long." })
    .max(50, { message: "Task description must not exceed 50 characters." }),
});

// Return schema based on form type
export const taskZodValidator = (todoType: TodoType) => {
  if (todoType === "addTask") {
    return addTaskSchema;
  }

  return;
};

export type AddTaskType = z.infer<typeof addTaskSchema>;
