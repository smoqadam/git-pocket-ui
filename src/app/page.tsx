"use client";
import { useState } from "react";
import { useArticlesFromDB } from "@/hooks/useArticlesFromDB";
import LoginForm from "@/components/LoginForm";
import ArticleList from "@/components/ArticleList";
import { useTheme } from "@/hooks/useTheme";
import { Article } from "@/types/article";
import Header from "@/components/Header";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { articles, loading } = useArticlesFromDB();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {loading ? (
        <div className="text-center py-12 text-gray-600 font-mono">Loading...</div>
      ) : articles && articles.length > 0 ? (
        <ArticleList />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
