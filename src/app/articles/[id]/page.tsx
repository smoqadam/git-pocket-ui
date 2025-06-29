'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Article } from '@/types/article';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      const request = indexedDB.open('ArticlesDB', 1);

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const tx = db.transaction('articles', 'readonly');
        const store = tx.objectStore('articles');
        const getRequest = store.get(id as string);

        getRequest.onsuccess = () => {
          setArticle(getRequest.result || null);
          setLoading(false);
        };

        getRequest.onerror = () => {
          setArticle(null);
          setLoading(false);
        };
      };

      request.onerror = () => {
        setArticle(null);
        setLoading(false);
      };
    };

    if (id) loadArticle();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-600 dark:text-gray-400">Loading article...</div>;
  }

  if (!article) {
    return <div className="p-6 text-red-600">Article not found.</div>;
  }

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-10">
      <h1>{article.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        <time>{new Date(article.date).toLocaleDateString()}</time>
        {article.authors.length > 0 && (
          <span> &middot; {article.authors.join(', ')}</span>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.content_html }} />
    </article>
  );
}
