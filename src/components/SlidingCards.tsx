import { cn, useEffectOnce } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageWithFallbackProps = React.HTMLAttributes<HTMLDivElement> & {};

const SlidingCards = (props: ImageWithFallbackProps) => {
  const { className, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, SetSlideState] = useState(1);

  function addTouchFunctionality() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
      if (touchendX < touchstartX - 30) {
        
          if (activeSlide < 3) SetSlideState(activeSlide+1);
        console.log(
          "swiped left!" + touchstartX + " to:" + activeSlide
        );
      }
      if (touchendX > touchstartX + 30) {
        
        if (activeSlide > 1) SetSlideState(activeSlide-1);
        console.log(
          "swiped right!" + touchstartX + " to:" + activeSlide
        );
      }
    }
    console.log("added listeners");
    containerRef.current!.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0]!.screenX;
    });
    containerRef.current!.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0]!.screenX;
      checkDirection();
    });
  }

  useEffect(addTouchFunctionality,[]);

  useEffect(() => {
    console.log("useEffected: " + activeSlide);
  }, [activeSlide]);

  return (
    <div
      ref={containerRef}
      className={cn(
        `flex h-[75vh] flex-row items-start justify-center gap-2 transition-all duration-200 ease-out ${className}`
      )}
      {...rest}
    >
      <Image
        className={`relative h-full ${activeSlide==1 ? "w-[80%] flex-grow " : activeSlide==2 ? "w-5" : "w-3"} rounded-xl object-cover`}
        alt=""
        src="/unsplashuhkoydaijhw1@2x.png"
        width={800}
        height={800}
      />
      <Image
        className={`relative h-full ${activeSlide==2 ? "w-[80%] flex-grow " : "w-5"} rounded-xl object-cover`}
        alt=""
        src="/unsplashzej4hpqlr5o@2x.png"
        width={800}
        height={800}
      />
      <Image
        className={`relative h-full ${activeSlide==3 ? "w-[80%] flex-grow " : activeSlide==2 ? "w-5" : "w-3"} rounded-xl object-cover`}
        alt=""
        src="/unsplash9fmdypcv8mq@2x.png"
        width={800}
        height={800}
      />
    </div>
  );
};

export default SlidingCards;
