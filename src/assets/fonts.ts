import {Marhey, Roboto_Slab, Ubuntu} from "next/font/google";

export const marhey = Marhey({
  subsets: ["arabic"],
  variable: "--font-marhey",
  display: "swap",
});
export const robotoSlab = Roboto_Slab({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto-slab",
  display: "swap",
});
export const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ubuntu",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});