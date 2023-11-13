import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import img1 from '../Assets/Images/unsplashuhkoydaijhw1@2x.png'

type ImageWithFallbackProps = React.HTMLAttributes<HTMLDivElement> & {};

const SlidingCards = (props: ImageWithFallbackProps) => {
  const { className, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, SetActiveSlide] = useState<number>(0)


  const cardImages = [img1, img1, img1, img1, img1]

  const handleSwipe = (event: MouseEvent | TouchEvent, info: any) => {
    const { offset, velocity } = info;

    // Set a threshold to determine if it's a swipe
    const isSwipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 1;

    if (isSwipe) {
      // Determine the direction of the swipe
      const direction = offset.x > 0 ? 'right' : 'left';

      // Handle the swipe direction as needed
      if (direction == "right" && activeSlide > 0) {
        SetActiveSlide(activeSlide-1)
      }
      else if (direction=="left" && activeSlide < (cardImages.length - 1) ) {
        SetActiveSlide(activeSlide+1)
      }
    }
  };

  useEffect(() => {
    console.log("useEffected: " + activeSlide);
  }, [activeSlide]);

  return (
    <div
      ref={containerRef}
      className={cn(
        `flex justify-center gap-2 ${className}`
      )}
      {...rest}
    >
        {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
            key={index}
            className={`card cursor-pointer h-[69vh] bg-cover bg-center rounded-xl `}
            variants={{
              expanded: {
                width: "80%",
                transition: {
                  duration: 0.2
                }
              },
              collapsed: {
                width: Math.abs(activeSlide - index) ==1 ? '20px': '12px',
                transition: {
                  duration: 0.2
                }
              },
            }}
            initial="collapsed"
            animate={index === activeSlide ? 'expanded': 'collapsed'}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleSwipe}
          >
            <Image
                className={cn(`relative h-full ${index === activeSlide ? 'w-full': ' touch-none'} rounded-xl object-cover`)}
                alt=""
                src={cardImages[index]??""}
                width={800}
                height={800}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default SlidingCards;
