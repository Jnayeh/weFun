"use client";
import {cn} from "@/lib/utils";
import Arrow from "@/lib/svg-store/arrow";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
export default function GoBack() {
  const t = useTranslations("not-found");
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
    >
      <Arrow className={cn("-scale-90 text-black dark:text-white")} />
      <span>{t("go-back")}</span>
    </button>
  );
}
