"use client";
import { useState } from "react";
import { Article } from '@/types/article';
import { fetchMetadata } from '@/utils/metadata';
import { useTheme } from '@/hooks/useTheme';



export default function LoginForm() {


    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
      const [sourceUrl, setSourceUrl] = useState("");
      const [githubToken, setGithubToken] = useState("");
        const [selected, setSelected] = useState<Article | null>(null);
      

  const handleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const arts = await fetchMetadata({
        sourceUrl: sourceUrl.trim(),
        githubToken: githubToken.trim() || undefined,
      });
      setArticles(arts);
    } catch (e: any) {
      setArticles([]);
      setError(e.message || "Failed to load articles");
    }
    setLoading(false);
  };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Connect Your Library
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your GitHub repository details to access your saved articles
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleLoad(); }} className="space-y-6">
          <div>
            <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <input
              id="sourceUrl"
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-gray-500 focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="githubToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Token (Optional)
            </label>
            <input
              id="githubToken"
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-gray-500 focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Required for private repositories
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !sourceUrl}
            className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
                     hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                     font-medium rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Connect'}
          </button>
        </form>
      </div>
    );
}