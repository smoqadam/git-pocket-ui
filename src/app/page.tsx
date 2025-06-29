"use client";
import { useState } from "react";
import { Article } from '@/types/article';
import { fetchMetadata } from '@/utils/metadata';
import { useTheme } from '@/hooks/useTheme';
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Git Pocket
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 
                   hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <LoginForm />
    </div>
  );
}
