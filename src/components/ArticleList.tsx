'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import ArticleView from './ArticleView';

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticlesFromIndexedDB = () => {
      const request = indexedDB.open('ArticlesDB', 1);

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(['articles'], 'readonly');
        const store = transaction.objectStore('articles');
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          setArticles(getAllRequest.result || []);
          setLoading(false);
        };
        getAllRequest.onerror = () => {
          setArticles([]);
          setLoading(false);
        };
      };

      request.onerror = () => {
        setArticles([]);
        setLoading(false);
      };
    };

    fetchArticlesFromIndexedDB();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">Loading articles...</p>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <button
            type="button"
            onClick={() => setSelectedArticle(null)}
            className="mb-8 inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to list
          </button>
          <ArticleView article={selectedArticle} />
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">No articles found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedArticle(article);
            }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2">
              {article.title}
            </h2>
            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 font-mono">
              <time>{new Date(article.date).toLocaleDateString()}</time>
              {article.authors.length > 0 && <span>{article.authors[0]}</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
