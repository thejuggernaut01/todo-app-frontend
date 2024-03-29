"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/components/Form/Button";
import FormInput from "@/shared/components/Form/FormInput";
import {
  ForgotPasswordType,
  authZodValidator,
} from "@/features/auth/utils/authValidation";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { toastSuccess } from "@/shared/utils/toastAlert";

const RecoverPassword: React.FC = () => {
  const defaultValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(authZodValidator("forgotPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (
    data: ForgotPasswordType
  ) => {
    const { email } = data;
    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      toastSuccess(response.data?.message);
    } catch (error) {
      apiResponseErrors(error);
    }
    reset();
  };

  return (
    <>
      <main className="w-[90%] mx-auto md:w-full md:flex h-screen mt-5 md:mt-0 lg:gap-5">
        <div className="relative flex-1 hidden md:block">
          <Image
            src="/images/forgot.svg"
            alt="Forgot Password"
            width={500}
            height={500}
            className="absolute object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-2 md:px-10 xl:px-12 2xl:px-16">
          <h1 className="text-[24px] font-bold">Forgot password</h1>
          <p className="text-sm">
            Please enter the email address to reset your todo app account.
          </p>

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
                placeholder="Email address"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors && errors.email ? (
                <p className="text-xs text-danger">{errors.email?.message}</p>
              ) : null}
            </div>

            <Button
              text="Forgot"
              type="submit"
              isSubmitting={isSubmitting}
              extraClass="bg-primary border-cancel"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default RecoverPassword;
