"use client";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
  Props,
} from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { useRef } from "react";
export function LottiePlayer(props: Props) {
  const lottieRef = useRef<DotLottieCommonPlayer>(null);
  return (
    <DotLottiePlayer
      ref={lottieRef}
      {...props}
    ></DotLottiePlayer>
  );
}
