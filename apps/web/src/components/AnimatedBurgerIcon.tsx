import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBurgerIconProps {
  isOpen: boolean;
  className?: string;
}

export const AnimatedBurgerIcon = ({ isOpen, className }: AnimatedBurgerIconProps) => {
  return (
    <div className={cn("flex flex-col justify-center items-center w-6 h-6", className)}>
      <span
        className={cn(
          "block w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out",
          isOpen ? "translate-y-[5px] rotate-45" : "-translate-y-1.5"
        )}
      ></span>
      <span
        className={cn(
          "block w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out my-[3px]",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      ></span>
      <span
        className={cn(
          "block w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out",
          isOpen ? "-translate-y-[5px] -rotate-45" : "translate-y-1.5"
        )}
      ></span>
    </div>
  );
};
