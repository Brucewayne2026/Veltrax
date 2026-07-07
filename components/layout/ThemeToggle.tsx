"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/30 light:border-black/10 light:bg-black/5 light:hover:bg-black/10 light:hover:border-black/20"
      >
        <span className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/30 light:border-black/10 light:bg-black/5 light:text-black light:hover:bg-black/10 light:hover:border-black/20"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}