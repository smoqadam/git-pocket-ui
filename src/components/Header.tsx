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
    <header className="w-full border-b border-gray-200 bg-white p-6">
      <div className="max-w-5xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-3xl font-serif text-gray-900">
          Git Pocket
        </div>

        {/* Sync form */}
        <div className="flex flex-wrap items-center gap-3 flex-grow justify-center md:justify-end">
          <input
            type="text"
            placeholder="Repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 text-base bg-white text-gray-900 focus:outline-none focus:border-gray-500 font-mono"
          />
          <input
            type="password"
            placeholder="Token (optional)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full md:w-48 px-4 py-3 border border-gray-300 text-base bg-white text-gray-900 focus:outline-none focus:border-gray-500 font-mono"
          />
          <button
            onClick={handleSync}
            disabled={loading || !repoUrl}
            className="px-6 py-3 text-base bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition-colors font-mono"
          >
            {loading ? "Syncing..." : "Sync"}
          </button>
        </div>
      </div>
      {message && (
        <div className="max-w-5xl mx-auto mt-4">
          <p className="text-gray-600 text-base font-mono">{message}</p>
        </div>
      )}
    </header>
  );
}
