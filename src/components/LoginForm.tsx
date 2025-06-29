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

      router.refresh();
    } catch (err: any) {
      setMessage(err.message || "Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="GitHub Repo URL"
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="GitHub Token (optional)"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Syncing..." : "Sync Articles"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
