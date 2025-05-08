import { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { fetchWarNews } from '../api/gnews';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const news = await fetchWarNews();
      setArticles(news);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Increased refresh frequency to 5 minutes for more real-time updates
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const likeArticle = (url: string) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.url === url ? { ...article, likes: article.likes + 1 } : article
      )
    );
  };

  const addComment = (url: string, text: string) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.url === url ? { 
          ...article, 
          comments: [
            ...article.comments,
            {
              id: Date.now().toString(),
              text,
              author: 'Anonymous',
              createdAt: new Date().toISOString()
            }
          ]
        } : article
      )
    );
  };

  return {
    articles,
    isLoading,
    error,
    refreshNews: fetchNews,
    likeArticle,
    addComment
  };
};