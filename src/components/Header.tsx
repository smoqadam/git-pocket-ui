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
      await syncArticlesFromGitHub({ repoUrl, token });
      setMessage("Synced successfully");
      setTimeout(() => location.reload(), 500);
    } catch (e: any) {
      setMessage(e.message || "Sync failed");
    }
    setLoading(false);
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          Git Pocket
        </div>

        {/* Sync form */}
        <div className="flex flex-wrap items-center gap-2 flex-grow justify-center md:justify-start">
          <input
            type="text"
            placeholder="Repo URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full md:w-52 px-3 py-1.5 rounded-md border text-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Token (optional)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full md:w-52 px-3 py-1.5 rounded-md border text-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSync}
            disabled={loading || !repoUrl}
            className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Syncing..." : "Sync"}
          </button>
        </div>

      </div>
    </header>
  );
}
