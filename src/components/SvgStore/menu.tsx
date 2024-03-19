import { cn } from "~/utils/helpers/server";
import React, { ButtonHTMLAttributes } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
const MenuIcon: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
}) => {
  return (
    <DotsVerticalIcon className={cn(`h-fit w-fit scale-150 ${className}`)} />
  );
};
export default MenuIcon;
