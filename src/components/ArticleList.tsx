"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types/article';

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticlesFromIndexedDB = async () => {
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
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">No articles found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => router.push(`/articles/${article.id}`)}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 
                   rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 
                   transition-colors duration-200"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 line-clamp-2">
            {article.title}
          </h2>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <time>{new Date(article.date).toLocaleDateString()}</time>
            {article.authors.length > 0 && <span>{article.authors[0]}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
