"use client";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { fetchMetadata } from "@/utils/metadata";
import { Article } from "@/types/article";
import { syncArticlesFromGitHub } from "@/utils/sync";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [repoUrl, setRepoUrl] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await syncArticlesFromGitHub({
        repoUrl,
        token,
      });
      setMessage("Synced successfully");
      setTimeout(() => location.reload(), 500);
    } catch (e: any) {
      setMessage(e.message || "Sync failed");
    }
    setLoading(false);
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 gap-2">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        Git Pocket
      </div>

      {/* Sync form */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="px-2 py-1 rounded border text-sm border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
        />
        <input
          type="password"
          placeholder="Token (optional)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="px-2 py-1 rounded border text-sm border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
        />
        <button
          onClick={handleSync}
          disabled={loading || !repoUrl}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Syncing..." : "Sync"}
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        title="Toggle Theme"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {/* Status message */}
      {message && (
        <div className="w-full text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
          {message}
        </div>
      )}
    </header>
  );
}
