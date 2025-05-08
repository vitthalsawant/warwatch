import React from 'react';
import NewsCard from './NewsCard';
import { AlertCircle, Loader } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsFeedProps {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  onLike: (url: string) => void;
  onComment: (url: string, comment: string) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ 
  articles, 
  isLoading, 
  error, 
  onLike, 
  onComment 
}) => {
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading latest updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded my-6">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 dark:text-gray-400 text-lg">No news articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <NewsCard 
          key={article.url} 
          article={article} 
          onLike={onLike} 
          onComment={onComment} 
        />
      ))}
    </div>
  );
};

export default NewsFeed;