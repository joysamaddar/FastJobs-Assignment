import Nav from "@/components/Nav";
import hero from "../public/hero.png";
import swigglyline from "../public/swigglyline.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-black h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-1/2 px-16 text-white flex flex-col gap-8">
          <div className="flex bg-lightblack text-sm md:text-xl w-fit py-2 px-8 mt-8 rounded-full gap-2">
            <Image src={swigglyline} alt="Swiggly Line" width="40" />Raised
            620K Pre-Seed Round 🎉
          </div>
          <h2 className="text-4xl md:text-[50px] font-[700] md:leading-[80px]">
            Hire Top 1% Tech Talent with ZERO Backouts
          </h2>
          <p className="text-lg">Discover CXOs, VPs and Developers for your startups</p>
          <Link href="/dashboard"><button className="p-4 bg-blue rounded-full text-sm md:text-lg">Start Hiring Now</button></Link>
        </div>
        <div className="lg:w-1/2 mt-16 lg:mt-0">
          <Image src={hero} alt="Hero Image" />
        </div>
      </main>
    </>
  );
}
