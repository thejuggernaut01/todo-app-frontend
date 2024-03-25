import { MouseEventHandler } from "react";

export type TasksDataProps = {
  _id: string;
  title: string;
  description: string;
  important: boolean;
  completed: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};
