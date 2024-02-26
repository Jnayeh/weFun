import LoadingLogo from "~/components/SvgStore/LoadingLogo";
import { ThemeProvider } from "~/utils/theme-provider";

export default function Loading() {
  return (
    <ThemeProvider enableSystem attribute="class" locale="ar-tn">
      <div className=" flex h-screen w-screen flex-col items-center justify-center">
        <LoadingLogo className="h-[25dvh] fill-transparent stroke-black animate-ping-slow [stroke-width:_5px] dark:stroke-white" />
        <h2 className="sr-only">Loading...</h2>
      </div>
    </ThemeProvider>
  );
}
