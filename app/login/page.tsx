"use client";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <title>Netflix Clone</title>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        fill
        className="-z-10 hidden opacity-60 sm:inline object-cover"
        alt="netflix poster"
        loading="eager"
      />

      <img
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-16 md:mt-0 md:max-w-md md:p-x-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>

        <div className="space-y-4 flex flex-col">
          <label htmlFor="">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label htmlFor="">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 6 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
