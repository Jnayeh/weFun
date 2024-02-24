import Image from "next/image";
import { dynamicBlurDataUrl } from "~/server/actions";

export default async function PlanningSteps() {
  const blurData = await dynamicBlurDataUrl("/beach.webp");
  return (
    <section className="h-[85dvh] w-full overflow-hidden">
      <div className="relative h-full w-full">
        <h2
          className="absolute top-12 z-0 mx-[10%] flex w-[80%] justify-center text-center 
            font-rubik text-[5vw] font-medium uppercase text-black sm:text-4xl md:text-5xl"
        >
          discover the best activities <br /> with one swipe
        </h2>
        <Image
          className="h-[90dvh] w-full object-cover"
          alt="friends sitting in front of firecamp"
          placeholder="blur"
          blurDataURL={blurData}
          width={1600}
          height={1000}
          src="/beach.webp"
        />
      </div>
    </section>
  );
}
