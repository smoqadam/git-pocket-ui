'use client';

import { Article } from '@/types/article';

type ArticleViewProps = {
  article: Article | null;
};

export default function ArticleView({ article }: ArticleViewProps) {
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" >
        <p className="text-gray-600" >Back</p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg max-w-none
      prose-gray
      prose-headings:text-gray-900 
      prose-headings:font-normal
      prose-headings:font-serif
      prose-p:text-gray-800 
      prose-p:leading-relaxed
      prose-p:font-serif
      prose-a:text-gray-700 
      prose-a:underline prose-a:decoration-gray-400
      prose-strong:text-gray-900 
      prose-code:text-gray-800 
      prose-code:bg-gray-100 
      prose-code:font-mono
      prose-pre:bg-gray-100 
      prose-pre:border prose-pre:border-gray-200
      prose-blockquote:border-gray-300 
      prose-blockquote:text-gray-700
      prose-blockquote:font-serif"
      dangerouslySetInnerHTML={{ __html: article.content_html }}
    />
  );
}
