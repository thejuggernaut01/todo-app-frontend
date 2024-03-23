"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import Button from "@/shared/components/Form/Button";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";
import { ApiResponse } from "@/features/auth/types/auth";

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? null;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.post("/auth/verify-email", {
          token,
        });

        if (response.status === 200) {
          setResponse("ok");
          setMessage(response.data.message);
          return;
        }
      } catch (error) {
        const castedError = error as ApiResponse;
        setMessage(castedError.response?.data.message);

        apiResponseErrors(error);
      }
    };

    verifyUser();
  }, []);

  return (
    <>
      <main className="w-[90%] mx-auto md:w-full md:flex h-screen mt-5 md:mt-0 lg:gap-5">
        <div className="relative flex-1 hidden md:block">
          <Image
            src="/images/signup.jpg"
            alt="Update password"
            width={500}
            height={500}
            className="absolute object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-2 md:px-10 xl:px-12 2xl:px-16">
          <h1 className="text-[24px] font-bold">
            {response === "ok" ? "Yay!!" : "Oops"}
          </h1>
          <p>{message}</p>
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
