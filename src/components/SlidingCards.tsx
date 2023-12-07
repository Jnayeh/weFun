import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { Category } from "~/db/schema";
import ImageWithFallback from "./ImageWithFallback";
import defaultImage from "~/Assets/Images/placeholder.webp";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type ImageWithFallbackProps = React.HTMLAttributes<HTMLDivElement> & {
  dataList: Category[];
  detailsUrl?: string;
};

const SlidingCards = (props: ImageWithFallbackProps) => {
  const { className, dataList, detailsUrl, ...rest } = props;
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const swipeValue = useMotionValue(0);
  const router = useRouter();

  const handleSwipeStart = (
    galleryRef: RefObject<HTMLDivElement>,
    divElement: HTMLDivElement,
    startX: number
  ) => {
    const handleSwipeMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.preventDefault();
      // Calculate the swipe distance based on the event type
      const clientX =
        moveEvent instanceof MouseEvent
          ? moveEvent.clientX
          : moveEvent.touches[0]?.clientX ?? 0;
      const deltaX = clientX - startX;
      const direction = deltaX > 0 ? "right" : "left";
     
      // Update the swipeValue based on the swipe distance
      swipeValue.set(deltaX);
      /* if (direction === "right" && activeCard > 0) {
        // Update the card width based on the swipe progress
        const activeElement = galleryRef.current?.childNodes.item(
          activeCard
        ) as HTMLDivElement;
        const cardWidth = activeElement.offsetWidth;
        const width =
          cardWidth - (swipeValue.get() - swipeValue.getPrevious()) + "px";
        activeElement.style.width = width;
        const previousElement =
          activeElement.previousElementSibling as HTMLDivElement;
        previousElement.classList.add("flex-grow");
        previousElement.style.width =
          previousElement.offsetWidth +
          (swipeValue.get() - swipeValue.getPrevious()) +
          "px";

        const nextElement = activeElement.nextElementSibling as
          | HTMLDivElement
          | undefined;
        if (nextElement) {
          nextElement.classList.remove("flex-grow");
          nextElement.style.width = "40px";
        }
        activeElement.classList.remove("flex-grow");
      } else if (direction === "left" && activeCard < dataList.length - 1) {
        // Update the card width based on the swipe progress
        const activeElement = galleryRef.current?.childNodes.item(
          activeCard
        ) as HTMLDivElement;
        const cardWidth = activeElement.offsetWidth;
        const width =
          // swipeValue.getPrevious()!=0 && swipeValue.get()==0 ? "90%" :
          cardWidth - (swipeValue.getPrevious() - swipeValue.get()) + "px";
        activeElement.style.width = width;
        activeElement.classList.remove("flex-grow");
        const previousElement = activeElement.previousElementSibling as
          | HTMLDivElement
          | undefined;
        if (previousElement) {
          previousElement.classList.remove("flex-grow");
          previousElement.style.width = "40px";
        }
        const nextElement = activeElement.nextElementSibling as HTMLDivElement;
        nextElement.classList.add("flex-grow");
        nextElement.style.width =
          nextElement.offsetWidth +
          (swipeValue.getPrevious() - swipeValue.get()) +
          "px";
      } */

      
      /* if (direction === "right" && activeCard > 0) {
        const activeElement = galleryRef.current?.childNodes.item(
          activeCard
        ) as HTMLDivElement;
      } else if (direction === "left" && activeCard < dataList.length - 1) {
        const activeElement = galleryRef.current?.childNodes.item(
          activeCard
        ) as HTMLDivElement;
      } */
      // Calculate the swipe distance based on the event type
    };

    const handleSwipeEnd = (endEvent: MouseEvent | TouchEvent) => {
      // Calculate the end position based on the event type
      const endX =
        endEvent instanceof MouseEvent
          ? endEvent.clientX
          : endEvent.changedTouches[0]?.clientX ?? 0;
      const velocity = endEvent instanceof MouseEvent ? endEvent.movementX : 2;
      const deltaX = endX - startX;
      const direction = deltaX > 0 ? "right" : "left";
      const isSwipe = Math.abs(deltaX) > 100;
      const isClick = Math.abs(deltaX) < 1;
      if (isSwipe) {
        if (direction === "right" && activeCard > 0) {
          setActiveCard(activeCard - 1);
          divElement.parentElement!.classList.remove("flex-grow");
        } else if (direction === "left" && activeCard < dataList.length - 1) {
          setActiveCard(activeCard + 1);
          divElement.parentElement!.classList.remove("flex-grow");
        }
      } else if (isClick) {
        router.push(
          detailsUrl ?? `/categories/${divElement.parentElement!.id}`
        );
      }

      divElement.parentElement!.classList.add("flex-grow");
      divElement.parentElement!.style.width = "80%";
      swipeValue.set(0);
      document.removeEventListener("touchend", handleSwipeEnd);
      document.removeEventListener("touchmove", handleSwipeMove);
      document.removeEventListener("mouseup", handleSwipeEnd);
      document.removeEventListener("mousemove", handleSwipeMove);
    };

    if (event instanceof MouseEvent) {
      document.addEventListener("mousemove", handleSwipeMove);
      document.addEventListener("mouseup", handleSwipeEnd);
    } else if (event instanceof TouchEvent) {
      document.addEventListener("touchmove", handleSwipeMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleSwipeEnd, { once: true });
    }
  };

  useEffect(() => {
    console.log("useEffected: " + activeCard);
  }, [activeCard]);

  return (
    <div
      ref={galleryRef}
      className={cn(`flex justify-center gap-2 ${className}`)}
      {...rest}
    >
      {dataList.map((el, index) => (
        <motion.div
          key={el.id}
          id={`${el.id}`}
          className={`card h-[69vh] cursor-pointer ${
            index === activeCard ? "flex-grow" : "flex-shrink"
          } rounded-[40px] bg-cover bg-center `}
          initial={{
            width:
              activeCard == index
                ? "80%"
                : activeCard - index == 1
                ? `40px`
                : activeCard - index == -1
                ? `40px`
                : "16px",
          }}
          animate={{
            width: activeCard == index ?"80%":
              activeCard - index == 1
                ? `40px`
                : activeCard - index == -1
                ? `40px`
                : "16px",
            transition: {
              type: "spring",
              duration: 1,
            },
          }}
          onMouseDown={(event) => {
            handleSwipeStart(
              galleryRef,
              event.target as HTMLDivElement,
              event.clientX
            );
            event.preventDefault();
          }}
          onTouchStart={(event) => {
            const touchEvent = event.touches[0];
            if (touchEvent && touchEvent.target) {
              handleSwipeStart(
                galleryRef,
                touchEvent.target as HTMLDivElement,
                touchEvent.clientX
              );
            }
          }}
        >
          <ImageWithFallback
            className={`relative h-full ${
              index === activeCard
                ? "w-full"
                : "w-full cursor-default touch-none grayscale"
            }  rounded-3xl object-cover`}
            alt=""
            src={el.cover ?? defaultImage}
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
