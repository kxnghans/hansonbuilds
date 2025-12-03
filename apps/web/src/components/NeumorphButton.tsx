import React from "react";
import { cn } from "../lib/utils";

interface NeumorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "default";
}

export const NeumorphButton = ({
    children,
    className,
    variant = "default",
    ...props
}: NeumorphButtonProps) => {
    const baseStyles =
        "py-3 px-6 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";

    const variants = {
        default: "bg-neumorph-bg text-neumorph-text shadow-neumorph-flat active:shadow-neumorph-pressed",
        primary: "bg-neumorph-accent text-white shadow-neumorph-flat active:shadow-neumorph-pressed",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
