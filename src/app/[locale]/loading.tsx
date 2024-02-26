import LoadingLogo from "~/components/SvgStore/LoadingLogo";

export default function Loading() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <LoadingLogo className="[stroke-width:_5px] h-[25dvh] stroke-black fill-transparent dark:stroke-white"/>
      <h2 className="sr-only">Loading...</h2>
    </div>
  );
}
