"use client"

import Image from "next/image";
import logo from "../public/logo.svg"
import Link from "next/link";
import { userStore } from "@/store/userStore";
import UserStoreInterface from "@/store/userStore.interface";

export default function Nav({style = "bg-black text-white"}){
  const user = userStore((state)=> (state as UserStoreInterface).user); 

  return (
    <nav className={`h-[10vh] px-6 lg:px-16 flex items-center justify-between ${style}`}>
      <Link href="/"><Image src={logo} alt="FastJobs logo" className="w-32 md:w-full"/></Link>
      <div className="flex items-center justify-center gap-4">
        {user && <Link href="/dashboard" className="text-sm md:text-base">Dashboard</Link>}
      {!user && <Link href="/login"><button className="min-w-[7rem] p-2 md:p-3 bg-blue rounded-full text-sm md:text-base">Login</button></Link>}
      </div>
    </nav>
  )
}