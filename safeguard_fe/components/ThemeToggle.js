'use client';

import { HeartPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  // const { theme, toggleTheme } = useTheme();
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/donate')}
      
      className="p-2 text-purple-600 transition-colors bg-purple-100 rounded-lg cursor-pointer dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800"
      aria-label="Toggle theme"
    >
      {/* {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />} */}
      <HeartPlusIcon/>
    </button>
  );
}