import React from "react";
import { FormButton } from "@/shared/types/form";
import Loader from "@/shared/components/Loader/Loader";

const Button: React.FC<FormButton> = ({
  type,
  text,
  ref,
  isSubmitting,
  extraClass,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        ref={ref}
        className={`${extraClass} border rounded-md w-full h-14 text-white text-base md:text-lg font-semibold focus-visible:outline-primary bg-black`}
        onClick={onClick}
      >
        {isSubmitting ? <Loader /> : text}
      </button>
    </>
  );
};

export default Button;
