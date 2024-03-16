import { cn } from "~/utils/helpers/server";
import React, { ButtonHTMLAttributes, HTMLProps } from "react";
import { useSideBarStore } from "~/store/sidebar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
const MenuIcon: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
}) => {
  return (
    <DotsVerticalIcon className={cn(`h-fit w-fit scale-[1.8] ${className}`)} />
  );
};
export default MenuIcon;
