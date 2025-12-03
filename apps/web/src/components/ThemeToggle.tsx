"use client";

import { useTheme } from "next-themes";
import { Icons } from "./Icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full flex items-center justify-center bg-neumorph-bg text-neumorph-text shadow-neumorph-flat active:shadow-neumorph-pressed transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label="Toggle Dark Mode"
      style={{ 
        "--neumorph-offset-base": "0.1875rem", 
        "--neumorph-blur-base": "0.375rem",
        "--neumorph-offset-mid": "0.1875rem",
        "--neumorph-blur-mid": "0.375rem",
      } as React.CSSProperties}
    >
      <Icons.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
