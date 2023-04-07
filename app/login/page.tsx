import Image from "next/image";
import logoWhite from "../../public/logo-white.svg";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login - FastJobs",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen text-white">
      <div className="hidden xl:flex flex-col px-32 pt-[80px]  w-1/2 lg:w-2/3 bg-[#5d5fef] relative overflow-hidden">
        <div className="absolute bg-[#6061ef] w-[50rem] h-[50rem] scale-150 left-[60%] top-[0%] rounded-full z-1 shadow-xl"></div>
        <div className="absolute bg-[#6667f0] w-[50rem] h-[50rem] scale-100 left-[60%]  top-[0%] rounded-full z-1 shadow-xl"></div>
        <div className="absolute bg-[#7777f2] w-[50rem] h-[50rem] scale-50 left-[60%]  top-[0%] rounded-full z-1 shadow-xl"></div>
        <Link href="./"><Image className="mb-[142px] z-10" src={logoWhite} alt="FastJobs Logo" width="79" height="79"/></Link>
        <div className="z-10">
          <p className="font-medium">Congratulations!</p>
          <h2 className="font-bold text-3xl my-4">
            Company XYZ is inviting
            <br /> you to take an interview
          </h2>
          <p className="font-medium">Skills being assessed:</p>
          <div className="font-medium my-4 flex gap-2">
            <span className="p-2 border-2 rounded-full">UI/UX</span>
            <span className="p-2 border-2 rounded-full">Product Design</span>
            <span className="p-2 border-2 rounded-full">Motion Graphics</span>
          </div>
          <p>Don&apos;t be nervous.</p>
        </div>
      </div>
      <div className="flex-1 z-10 bg-[#1c1d21] flex flex-col items-start justify-center px-6 lg:px-16">
        <div className="xl:hidden mx-auto w-full md:w-[50%] xl:w-full mb-8">
        <Link href="./"><Image className="z-10" src={logoWhite} alt="FastJobs Logo" width="50" height="50"/></Link>
        </div>
        <p  className="font-bold text-2xl xl:text-3xl mb-4  w-full md:w-[50%]  mx-auto text-left xl:w-full">For us to stay in touch</p>
        <LoginForm/>
      </div>
    </main>
  );
}
