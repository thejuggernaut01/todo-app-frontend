"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/components/Form/Button";
import FormInput from "@/shared/components/Form/FormInput";
import {
  UpdatePasswordType,
  authZodValidator,
} from "@/features/auth/utils/validation";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { toastSuccess } from "@/shared/utils/toastAlert";

const UpdatePassword: React.FC = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? null;

  const defaultValues = {
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(authZodValidator("updatePassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<UpdatePasswordType> = async (
    data: UpdatePasswordType
  ) => {
    const { password } = data;
    try {
      const response = await api.patch("/auth/update-password", {
        token,
        password,
      });

      toastSuccess(response.data?.message);
    } catch (error) {
      apiResponseErrors(error);
    }
    reset();
  };

  return (
    <>
      <main className="w-[90%] mx-auto md:w-full md:flex h-[calc(100vh-80px)] md:h-[calc(100vh-7.2vh)] mt-5 md:mt-0 lg:gap-5">
        <div className="relative flex-1 hidden md:block">
          <Image
            src="/images/update.svg"
            alt="Update password"
            width={500}
            height={500}
            className="absolute object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-2 md:px-10 xl:px-12 2xl:px-16">
          <h1 className="text-[24px] font-bold">Set new password</h1>
          <p>Set new password to secure your The Todo App account</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit(onSubmit)(event);
            }}
            className="mt-5 space-y-4"
          >
            <div className="space-y-1">
              <FormInput
                placeholder="New Password"
                type="password"
                id="password"
                {...register("password")}
              />
              {errors && errors.password ? (
                <p className="text-xs text-danger">
                  {errors.password?.message}
                </p>
              ) : null}
            </div>

            <Button
              text="Create new password"
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

export default UpdatePassword;
