"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? "system" : theme || "system";

  const options = [
    { key: "light", icon: <Sun size={16} /> },
    { key: "dark", icon: <Moon size={16} /> },
    { key: "system", icon: <Laptop size={16} /> },
  ] as const;

  return (
    <div
      className="
        flex items-center gap-1 p-1 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-gray-400/20  dark:border-white/10"
    >
      {options.map((opt) => {
        const active = current === opt.key;

        return (
          <button
            key={opt.key}
            onClick={() => setTheme(opt.key)}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 hover:cursor-pointer
              ${active
                ? "bg-white/20 dark:bg-white/10 shadow-md"
                : "opacity-60 hover:opacity-100"
              }
            `}
            title={opt.key}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}