import React, { CSSProperties } from "react";
import { cn } from "../lib/utils";

interface NeumorphCardProps {
  children: React.ReactNode;
  className?: string;
  convex?: boolean;
  concave?: boolean;
  onClick?: () => void;
}

export const NeumorphCard = ({
  children,
  className,
  convex = false,
  concave = false,
  onClick,
}: NeumorphCardProps) => {
  let shadowClass = "shadow-neumorph-flat";
  if (convex) shadowClass = "shadow-neumorph-convex";
  if (concave) shadowClass = "shadow-neumorph-concave";

  return (
    <div
      onClick={onClick}
      className={cn("bg-neumorph-bg rounded-2xl", shadowClass, className)}
    >
      {children}
    </div>
  );
};
