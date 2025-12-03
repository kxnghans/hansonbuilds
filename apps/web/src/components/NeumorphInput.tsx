import React from "react";
import { cn } from "../lib/utils";

interface NeumorphInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
}

export const NeumorphInput = ({ label, className, error = false, required, ...props }: NeumorphInputProps) => {
    const focusRingColor = error ? "focus:ring-red-500" : "focus:ring-neumorph-accent";

    return (
        <div className="flex flex-col gap-2 w-full text-left">
            {label && (
                <label htmlFor={props.id} className="text-sm font-medium text-neumorph-text/80 ml-1">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full p-4 rounded-xl bg-neumorph-bg shadow-neumorph-concave focus:outline-none focus:ring-2 transition-shadow text-neumorph-text placeholder-neumorph-text/40 text-base",
                    focusRingColor,
                    className
                )}
                required={required}
                {...props}
            />
        </div>
    );
};
