import React, { useRef, useEffect, HTMLProps } from "react";
import { motion, AnimatePresence, AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";

type SidebarProps = HTMLProps<HTMLDivElement> &
  AnimationProps & {
    isOpen: boolean;
    onClose: () => void;
  };

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  children,
  className,
  transition,
  initial,
  animate,
  exit,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("ontouchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("ontouchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={sidebarRef}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className={cn(
            `fixed left-0 top-0 z-50 box-border w-[80%] max-w-xs ${className}`
          )}
          style={{
            position: "fixed",
            height: "100hv",
          }}
        >
          
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
