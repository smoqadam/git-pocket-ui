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
    <div>
      {/* Article Header with Metadata */}
      <header className="mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-serif text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-base text-gray-600 font-mono">
          <time className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          
          {article.authors.length > 0 && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {article.authors.join(', ')}
            </div>
          )}
          
          {article.url && (
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Original Source
            </a>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-xl max-w-none
        prose-gray
        prose-headings:text-gray-900 
        prose-headings:font-normal
        prose-headings:font-serif
        prose-headings:text-3xl
        prose-h2:text-2xl
        prose-h3:text-xl
        prose-p:text-gray-800 
        prose-p:leading-relaxed
        prose-p:font-serif
        prose-p:text-lg
        prose-a:text-gray-700 
        prose-a:underline prose-a:decoration-gray-400
        prose-strong:text-gray-900 
        prose-code:text-gray-800 
        prose-code:bg-gray-100 
        prose-code:font-mono
        prose-code:text-base
        prose-pre:bg-gray-100 
        prose-pre:border prose-pre:border-gray-200
        prose-pre:text-sm
        prose-blockquote:border-gray-300 
        prose-blockquote:text-gray-700
        prose-blockquote:font-serif
        prose-blockquote:text-lg
        prose-li:text-lg"
        dangerouslySetInnerHTML={{ __html: article.content_html }}
      />
    </div>
  );
}
