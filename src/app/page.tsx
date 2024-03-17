"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginType, authZodValidator } from "@/features/auth/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/components/Form/FormInput";
import Button from "@/shared/components/Form/Button";

const Login: React.FC = () => {
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginType>({
    resolver: zodResolver(authZodValidator("login")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
    } catch (error) {
      // handleAsyncErrors(error);
    }
    reset();
  };

  return (
    <>
      <main className="md:w-full md:flex lg:gap-5">
        <div className="relative flex-1 hidden md:block">
          <Image
            src="/images/login.jpg"
            alt="Log in to your account"
            width={500}
            height={500}
            className="absolute object-cover w-full h-screen"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 h-screen md:px-10 xl:px-12 2xl:px-16">
          <h1 className="sm:text-[24px] font-bold text-lg">
            Login in to your account
          </h1>
          <p className="text-sm font-semibold sm:text-base">
            {"Don't have an account?"}{" "}
            <Link href="/signup" className="font-medium text-blue-600">
              Sign Up
            </Link>
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
                <p className="text-xs text-red-600">{errors.email?.message}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <FormInput
                placeholder="Password"
                type="password"
                id="password"
                {...register("password")}
              />
              {errors && errors.password ? (
                <p className="text-xs text-red-600">
                  {errors.password?.message}
                </p>
              ) : null}
            </div>

            <Link href="/forgot-password">
              <p className="flex justify-end mt-2 text-sm text-blue-600 cursor-pointer">
                Forgot Password?
              </p>
            </Link>

            <Button text="Log In" type="submit" isSubmitting={isSubmitting} />
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
