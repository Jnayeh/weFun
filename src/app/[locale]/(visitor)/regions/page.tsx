import { cn } from "~/utils/helpers/server";
import { Metadata } from "next";
import Regions from "./regions";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Places - Find your new experiences",
  description: "List of Places for activities",
};
const RegionsPage = async () => {
  return (
    <>
      <div className="relative aspect-video overflow-hidden md:hidden">
        <Image
          className="object-cover object-center brightness-90"
          alt="friends sitting in front of firecamp"
          fill
          src="/beach.webp"
        />
      </div>
      <main
        className={cn(
          " mx-auto flex flex-col items-center gap-2 py-4"
        )}
      >
        <Regions />
      </main>
    </>
  );
};
export default RegionsPage;
