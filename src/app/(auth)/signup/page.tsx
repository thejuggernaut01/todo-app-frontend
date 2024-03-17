"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/shared/components/Form/Button";
import FormInput from "@/shared/components/Form/FormInput";
import { SignUpType, authZodValidator } from "@/features/auth/utils/validation";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";

const Signup: React.FC = () => {
  const router = useRouter();

  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpType>({
    resolver: zodResolver(authZodValidator("signup")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    const { email, firstName, lastName, password } = data;
    try {
      const response = await api.post("/auth/register", {
        email,
        firstName,
        lastName,
        password,
      });

      console.log(response);
      router.push("/todo");
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
            src="/images/signup.jpg"
            alt="Sign up account"
            width={500}
            height={500}
            className="absolute object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 md:px-10 xl:px-12 2xl:px-16">
          <h1 className="sm:text-[24px] font-bold text-lg">
            Create your account
          </h1>
          <p className="text-sm font-semibold sm:text-base">
            Have an account?{" "}
            <Link
              href="/"
              className="font-medium text-blue-600 focus-visible:outline-blue-600"
            >
              Login
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
                placeholder="First name"
                type="text"
                id="firstName"
                autoFocus={true}
                {...register("firstName")}
              />
              {errors && errors.firstName ? (
                <p className="text-xs text-red-600">
                  {errors.firstName?.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-1">
              <FormInput
                placeholder="Last name"
                type="text"
                id="lastName"
                {...register("lastName")}
              />
              {errors && errors.lastName ? (
                <p className="text-xs text-red-600">
                  {errors.lastName?.message}
                </p>
              ) : null}
            </div>

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

            <Button
              text="Create your account"
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

export default Signup;
