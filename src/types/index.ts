export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface ApiResponse {
  totalArticles: number;
  articles: NewsArticle[];
}