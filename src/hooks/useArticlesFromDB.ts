"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";

export function useArticlesFromDB() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesFromIndexedDB = async () => {
      try {
        const request = indexedDB.open("ArticlesDB", 1);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains("articles")) {
            db.createObjectStore("articles", { keyPath: "id" });
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction(["articles"], "readonly");
          const objectStore = transaction.objectStore("articles");
          const getAllRequest = objectStore.getAll();

          getAllRequest.onsuccess = () => {
            setArticles(getAllRequest.result);
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
      } catch {
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticlesFromIndexedDB();
  }, []);

  return { articles, loading };
}
