"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { api } from "~/trpc/server";
import { nextCache } from "~/utils/helpers/server";

export async function nextRevalidate(tag: string) {
  revalidateTag(tag);
}
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.NEXT_PUBLIC_DOMAIN;

export const dynamicBlurDataUrl = async function (url: string) {
  const headersList = headers();
  let host = headersList.get("host");
  if (host && !host.includes("localhost")) {
    host = host.includes("127.0.0.1") || host.includes("10.") || host.includes("192.") || host.includes("172.")
      ? "http://".concat(host)
      : "https://".concat(host);
  } else host = baseUrl ?? "no-host-add-to-env";

  const req = new Request(`${host}/_next/image?url=${url}&w=16&q=75`);
  const base64str = await fetch(req).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  console.log("blur Data For : ", host + url);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
};
export const cacheableCategories = nextCache(
  () => api.category.getAll.query(),
  ["categories"],
  {
    revalidate: 60,
    tags: ["categories"],
  }
);
