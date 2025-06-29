"use client";
import { useState, useEffect } from 'react';
import { Article } from '@/types/article';

interface ArticleListProps {
  onSelectArticle: (article: Article) => void;
}

export default function ArticleList({ onSelectArticle }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesFromIndexedDB = async () => {
      try {
        const request = indexedDB.open('ArticlesDB', 1);
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('articles')) {
            db.createObjectStore('articles', { keyPath: 'id' });
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction(['articles'], 'readonly');
          const objectStore = transaction.objectStore('articles');
          const getAllRequest = objectStore.getAll();

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
      } catch (error) {
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticlesFromIndexedDB();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600 dark:text-gray-400">Loading articles...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 dark:text-gray-400 mb-4">No articles found</div>
        <div className="text-sm text-gray-500 dark:text-gray-500">Add some articles to get started</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onSelectArticle(article)}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 
                   rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 
                   transition-colors duration-200"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 
                       line-clamp-2 leading-tight">
            {article.title}
          </h2>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <time>{new Date(article.date).toLocaleDateString()}</time>
            {article.authors.length > 0 && (
              <span>{article.authors[0]}</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
