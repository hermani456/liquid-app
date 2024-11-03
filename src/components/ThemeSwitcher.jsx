"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 size-10"
    >
      <AnimatePresence mode="wait" >
        {isDark ? (
          <motion.span
            key="dark"
            initial={{ opacity: 0, rotate: -90}}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
            style={{ display: "inline-block" }}
          >
            <Sun size={24} />
          </motion.span>
        ) : (
          <motion.span
            key="light"
            initial={{ opacity: 0, rotate: -90}}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
            style={{ display: "inline-block" }}
          >
            <Moon size={24} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}