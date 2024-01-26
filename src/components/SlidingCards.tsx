"use client"
import { cn } from "~/utils/helpers/server";
import { motion, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { Category } from "~/db/types";
import ImageWithFallback from "./ImageWithFallback";
import defaultImage from "~/Assets/placeholder.webp";
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
      const isSwipe = Math.abs(deltaX) > 50;
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
            index === activeCard ? "flex-grow" : ""
          } rounded-[40px] bg-cover bg-center `}
          initial={{
            width:
              activeCard == index
                ? "86%"
                : activeCard - index == 1
                ? `40px`
                : activeCard - index == -1
                ? `40px`
                : "16px",
          }}
          animate={{
            width: activeCard == index ?"86%":
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
            event.preventDefault();
            handleSwipeStart(
              galleryRef,
              event.target as HTMLDivElement,
              event.clientX
            );
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
export default SlidingCards;
