'use client';

import { Article } from '@/types/article';

type ArticleViewProps = {
  article: Article | null;
};

export default function ArticleView({ article }: ArticleViewProps) {
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" >
        <p className="text-red-600" >Back</p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg max-w-none
      prose-neutral 
      prose-headings:text-neutral-900 
      prose-headings:font-semibold
      prose-p:text-neutral-700 
      prose-p:leading-relaxed
      prose-a:text-indigo-600 
      prose-a:underline prose-a:decoration-indigo-500 prose-a:underline-offset-2
      prose-strong:text-neutral-900 
      prose-code:text-neutral-900 
      prose-code:bg-neutral-100 
      prose-pre:bg-neutral-100 
      prose-blockquote:border-neutral-300 
      prose-blockquote:text-neutral-600 "
      dangerouslySetInnerHTML={{ __html: article.content_html }}
    />
  );
}
