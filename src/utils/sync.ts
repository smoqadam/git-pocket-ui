// lib/sync.ts
import { fetchMetadata } from "./metadata";
import { Article } from "@/types/article";

export async function syncArticlesFromGitHub({
  repoUrl,
  token,
}: {
  repoUrl: string;
  token?: string;
}): Promise<void> {
  const articles: Article[] = await fetchMetadata({
    sourceUrl: repoUrl.trim(),
    githubToken: token?.trim() || undefined,
  });

  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("ArticlesDB", 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("articles")) {
        db.createObjectStore("articles", { keyPath: "id" });
      }
    };

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction("articles", "readwrite");
      const store = tx.objectStore("articles");

      // Clear old entries
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        // Add new entries
        articles.forEach((a) => store.put(a));
        tx.oncomplete = () => resolve();
        tx.onerror = (e) => reject(tx.error);
      };

      clearRequest.onerror = () => reject(clearRequest.error);
    };

    dbRequest.onerror = () => {
      reject(dbRequest.error);
    };
  });
}
