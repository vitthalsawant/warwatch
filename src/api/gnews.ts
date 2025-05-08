import { ApiResponse, NewsArticle } from '../types';

const API_KEY = '7d9f73d819a04ff4ea372fc319841247';
const BASE_URL = 'https://gnews.io/api/v4';

const transformArticle = (article: any): NewsArticle => {
  return {
    title: article.title,
    description: article.description,
    content: article.content,
    url: article.url,
    image: article.image || 'https://images.pexels.com/photos/4057059/pexels-photo-4057059.jpeg',
    publishedAt: article.publishedAt,
    source: {
      name: article.source.name,
      url: article.source.url,
    },
    likes: 0,
    comments: [],
  };
};

export const fetchWarNews = async (): Promise<NewsArticle[]> => {
  try {
    // Calculate timestamp for 24 hours ago
    const fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - 24);
    
    // Updated keywords to focus on recent Indian attacks
    const query = encodeURIComponent('(India attacks Pakistan) OR (Indian military Pakistan) OR (India Pakistan border)');
    
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&lang=en&country=pk&from=${fromDate.toISOString()}&sortby=publishedAt&max=10&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data: ApiResponse = await response.json();
    return data.articles.map(transformArticle);
  } catch (error) {
    console.error('Error fetching war news:', error);
    return [];
  }
};