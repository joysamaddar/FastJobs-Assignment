"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Toast from "./Toast";
import { toastStore } from "@/store/toastStore";
import { shallow } from "zustand/shallow";
import ToastStoreInterface from "@/store/toastStore.interface";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { show, setShow } = toastStore(
    (state) => ({
      show: (state as ToastStoreInterface).show,
      setShow: (state as ToastStoreInterface).setShow,
    }),
    shallow
  );

  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      "https://frontendtestapi.staging.fastjobs.io/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    if (!res.ok) {
      setShow(true);
      return;
    }
    router.push("/dashboard");
  };
  return (
    <>
      <form
        className="flex flex-col w-full md:w-[50%] mx-auto xl:w-full"
        onSubmit={formSubmitHandler}
      >
        <label htmlFor="username" className="text-gray mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded-lg bg-black border-2 border-gray mb-4"
          required
        />
        <label htmlFor="password" className="text-gray mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-lg bg-black border-2 border-gray mb-4"
          required
        />
        <button type="submit" className="p-4 rounded-lg bg-[#b2baff]">
          Continue
        </button>
      </form>
     <Toast content="Please check your username and password"/>
    </>
  );
}
