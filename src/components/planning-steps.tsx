import Image from "next/image";
import { dynamicBlurDataUrl } from "~/server/actions";

export default async function PlanningSteps() {
  const blurData = await dynamicBlurDataUrl("/beach.webp");
  const steps = [
    {
      src: "/steps/plan.webp",
      alt: "plani kharjtek",
      description: "Plan your next adventure with us",
    },
    {
      src: "/steps/reserve.webp",
      alt: "reservi li ysa3dek",
      description: "Reserve your activity on our platform",
    },
    {
      src: "/steps/live.webp",
      alt: "3ich jawk",
      description: "Live your adventure with yor friends",
    },
  ];
  return (
    <section className="relative h-fit w-full">
      <div className="relative h-fit w-full">
        <h2
          className=" z-10 flex w-[80%] flex-col justify-center text-center font-ubuntu text-[15vw] leading-tight font-medium pt-10 sm:pt-0
            text-white 2xs:text-7xl md:flex-row md:gap-2 sm:text-8xl md:absolute md:-top-16 mx-[10%] md:text-6xl xl:text-7xl"
        >
          <span>Barmejha</span>
          <span>in 3 words</span>
        </h2>
        <Image
          className="absolute -top-10 -z-10 h-[150%] w-full object-cover brightness-75"
          alt="friends sitting in front of firecamp"
          placeholder="blur"
          blurDataURL={blurData}
          width={1600}
          height={1000}
          src="/beach.webp"
        />

        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-8 p-8 pt-24 pb-16 md:flex-row md:gap-4 md:pt-48 md:pb-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl bg-slate-100 p-3 py-4 text-center dark:bg-slate-700 md:w-1/3"
            >
              <h3 className=" text-[6vw] font-semibold text-[#004449] dark:text-white md:text-2xl">
                {step.alt}
              </h3>
              <Image
                src={step.src}
                alt={step.alt}
                className=" h-32 w-auto object-contain md:absolute md:top-0 md:-z-10 md:-translate-y-3/4"
                width={170}
                height={140}
              />
              <p className=" px-4 pt-4 md:pt-2 font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
