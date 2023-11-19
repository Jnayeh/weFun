import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Category } from "~/db/schema";
import ImageWithFallback from "./ImageWithFallback";
import defaultImage from "~/Assets/Images/placeholder.webp";
import { Skeleton } from "@/components/ui/skeleton";

type ImageWithFallbackProps = React.HTMLAttributes<HTMLDivElement> & {
  dataList: Category[];
};

const SlidingCards = (props: ImageWithFallbackProps) => {
  const { className, dataList, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, SetActiveSlide] = useState<number>(0);

  const handleSwipe = (event: MouseEvent | TouchEvent, info: any) => {
    const { offset, velocity } = info;

    // Set a threshold to determine if it's a swipe
    const isSwipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 1;

    if (isSwipe) {
      // Determine the direction of the swipe
      const direction = offset.x > 0 ? "right" : "left";

      // Handle the swipe direction as needed
      if (direction == "right" && activeSlide > 0) {
        SetActiveSlide(activeSlide - 1);
      } else if (direction == "left" && activeSlide < dataList.length - 1) {
        SetActiveSlide(activeSlide + 1);
      }
    }
  };

  useEffect(() => {
    console.log("useEffected: " + activeSlide);
  }, [activeSlide]);

  return (
    <div
      ref={containerRef}
      className={cn(`flex justify-center gap-2 ${className}`)}
      {...rest}
    >
      {dataList.map((el, index) => (
        <motion.div
          key={index}
          className={`card h-[69vh] cursor-pointer ${
            index === activeSlide ? "flex-grow" : " "
          } rounded-[40px] bg-cover bg-center `}
          variants={{
            expanded: {
              width: "86%",
              transition: {
                duration: 0.2,
              },
            },
            collapsed: {
              width: Math.abs(activeSlide - index) == 1 ? "40px" : "16px",
              transition: {
                duration: 0.4,
              },
            },
          }}
          initial="collapsed"
          animate={index === activeSlide ? "expanded" : "collapsed"}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          <ImageWithFallback
            className={cn(
              `relative h-full ${
                index === activeSlide
                  ? "w-full"
                  : " cursor-default touch-none grayscale"
              }  rounded-3xl object-cover`
            )}
            alt=""
            src={el.image ?? defaultImage}
            fallBackSrc={defaultImage}
            width={800}
            height={800}
          />
        </motion.div>
      ))}
    </div>
  );
};
export function SlidingCardsSkeleton() {
  return (
    <div className="flex h-[69vh] justify-center gap-2">
      <Skeleton className="h-full w-full flex-grow animate-pulse rounded-[40px]  bg-slate-400 " />
      <Skeleton className="h-full w-10 animate-pulse rounded-[40px]  bg-slate-400 " />
      <Skeleton className="h-full w-4 animate-pulse rounded-[40px]  bg-slate-400 " />
    </div>
  );
}
export default SlidingCards;
