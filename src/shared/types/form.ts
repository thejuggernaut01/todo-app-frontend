import { ChangeEventHandler, MouseEventHandler } from "react";

export type FormInputProps = {
  type: string;
  placeholder?: string;
  id?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  extraClass?: string;
};

export type FormButton = {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  isSubmitting?: true | false;
  extraClass?: string;

  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};
