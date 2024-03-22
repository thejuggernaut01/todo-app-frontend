"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import Button from "@/shared/components/Form/Button";
import { verify } from "crypto";
import api from "@/shared/utils/api";
import apiResponseErrors from "@/shared/utils/apiResponseErrors";

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? null;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.post("/auth/verify-email", {
          token,
        });
      } catch (error) {
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
          <h1 className="text-[24px] font-bold">Yay!!</h1>
          <p>Your account has been verified</p>
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
