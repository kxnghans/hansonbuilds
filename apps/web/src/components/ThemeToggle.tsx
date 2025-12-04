"use client";

import { useTheme } from "next-themes";
import { Icons } from "./Icons";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-3 rounded-full flex items-center justify-center bg-neumorph-bg text-neumorph-text shadow-neumorph-flat active:shadow-neumorph-pressed transition-all active:scale-95"
      aria-label="Toggle Theme"
      title={`Current theme: ${theme}`}
      style={{ 
        "--neumorph-offset-base": "0.1875rem", 
        "--neumorph-blur-base": "0.375rem",
        "--neumorph-offset-mid": "0.1875rem",
        "--neumorph-blur-mid": "0.375rem",
      } as React.CSSProperties}
    >
      {theme === "system" && <Icons.Laptop className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "light" && <Icons.Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "dark" && <Icons.Moon className="h-[1.2rem] w-[1.2rem]" />}
    </button>
  );
}
