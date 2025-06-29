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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-normal">Loading articles...</p>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <button
            type="button"
            onClick={() => setSelectedArticle(null)}
            className="mb-12 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-mono text-base"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-normal">No articles found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedArticle(article);
              }}
              className="bg-white border border-gray-200 p-6 cursor-pointer hover:bg-gray-100 transition-colors outline-none focus:bg-gray-100 h-fit"
            >
              <h2 className="text-xl font-serif text-gray-900 mb-4 leading-tight line-clamp-3">
                {article.title}
              </h2>
              <div className="space-y-2 text-sm text-gray-600 font-mono">
                <time className="block">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                {article.authors.length > 0 && (
                  <div className="text-gray-500">
                    {article.authors.slice(0, 2).join(', ')}
                    {article.authors.length > 2 && ` +${article.authors.length - 2} more`}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
