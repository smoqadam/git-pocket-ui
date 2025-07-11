"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { syncArticlesFromGitHub } from "@/utils/sync";

export default function LoginForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await syncArticlesFromGitHub({ repoUrl, token });

      location.reload();
    } catch (err: any) {
      setMessage(err.message || "Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 max-w-lg w-full mx-4">
        <h2 className="text-3xl font-serif text-gray-900 mb-8">Sync Articles</h2>
        <div className="space-y-6">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="GitHub Repo URL"
            required
            className="w-full border border-gray-300 p-4 text-base bg-white text-gray-900 focus:outline-none focus:border-gray-500 font-mono"
          />
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="GitHub Token (optional)"
            className="w-full border border-gray-300 p-4 text-base bg-white text-gray-900 focus:outline-none focus:border-gray-500 font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 disabled:opacity-50 transition-colors font-mono text-base"
          >
            {loading ? "Syncing..." : "Sync Articles"}
          </button>
          {message && <p className="text-gray-600 text-base font-mono">{message}</p>}
        </div>
      </form>
    </div>
  );
}
