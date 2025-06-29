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
        <div className="flex items-center gap-4">
          <div className="text-3xl font-serif text-gray-900">
            <a href="/">Git Pocket</a>
          </div>
          <a 
            href="https://github.com/smoqadam/git-pocket-ui" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="View on GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
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
