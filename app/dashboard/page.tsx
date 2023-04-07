import Nav from "@/components/Nav";
import Image from "next/image";
import memo from "../../public/memo.svg"
import Table from "@/components/Table";

export const metadata = {
  title: "Dashboard - FastJobs",
};

export default function Dashboard() {
  return (
    <>
      <Nav style="bg-white text-black"/>
      <main className="text-black bg-white min-h-[90vh]">
      <div className="px-6 lg:px-16 pt-8 mb-16">
         <div className="flex flex-row gap-2 items-center justify-start font-semibold text-3xl">Graphic Designer <Image src={memo} alt="memo" height='40' width='40'/></div>
          <Table/>
      </div>
      </main>
    </>
  );
}
