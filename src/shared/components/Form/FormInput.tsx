"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { FormInput } from "@/shared/types/form";

const FormInput: React.ForwardRefRenderFunction<HTMLInputElement, FormInput> = (
  { type, placeholder, id, autoFocus, defaultValue, ...props },
  ref
) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          type={toggle && type === "password" ? "text" : type}
          placeholder={placeholder}
          id={id}
          autoFocus={autoFocus}
          ref={ref}
          defaultValue={defaultValue}
          {...props}
          className="w-full pl-4 text-sm border rounded-lg border-inactive h-14 outline-2 outline-primary focus-visible:outline-primary md:text-lg placeholder:text-base text-secondary"
        />

        {type === "password" && toggle ? (
          <button
            type="button"
            onClick={() => setToggle((prev) => !prev)}
            className="focus-visible:outline-primary absolute top-[35%] right-5"
          >
            <Image
              src="/icons/open-eye.svg"
              width={20}
              height={20}
              alt="Click to hide password"
            />
          </button>
        ) : null}

        {type === "password" && !toggle ? (
          <button
            type="button"
            onClick={() => setToggle((prev) => !prev)}
            className="focus-visible:outline-primary absolute top-[35%] right-5"
          >
            <Image
              src="/icons/slashed-eye.svg"
              width={20}
              height={20}
              alt="Click to reveal password"
            />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default forwardRef(FormInput);
