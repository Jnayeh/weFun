import { cn } from "~/utils/helpers/server";
import React, { ButtonHTMLAttributes, HTMLProps } from "react";
import { useSideBarStore } from "~/store/sidebar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
const SvgUser: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { toggleRightBar } = useSideBarStore();
  return (
    <button type="button"
      {...props}
      className={cn(`h-fit w-fit scale-[1.8] ${className}`)}
      onClick={toggleRightBar}
      aria-label="login icon"
    >
      <DotsVerticalIcon className="w-fit"/>
    </button>
  );
};
export default SvgUser;
