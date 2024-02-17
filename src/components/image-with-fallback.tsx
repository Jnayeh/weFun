"use client";
import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

type ImageWithFallbackProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> &
  ImageProps &
  React.RefAttributes<HTMLImageElement | null> & {
    fallBackSrc: StaticImport;
  };

const ImageWithFallback = ({
  src,
  fallBackSrc,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallBackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
