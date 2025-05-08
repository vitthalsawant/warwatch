import React, { useState } from 'react';
import { Heart, MessageCircle, Copy, Share } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onLike: (url: string) => void;
  onComment: (url: string, comment: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minutes ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hours ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(article.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(article.url, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6 transition-all duration-300 hover:shadow-xl">
      {article.image && (
        <div className="relative h-56 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-red-700 text-white px-3 py-1 text-sm font-semibold">
            {article.source.name}
          </div>
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold">
            {formatDate(article.publishedAt)}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {article.title}
        </h2>
        
        <p className="text-gray-700 mb-6">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onLike(article.url)}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Heart className={`h-5 w-5 ${article.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{article.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{article.comments.length}</span>
            </button>
            
            <button 
              onClick={handleCopy}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="Copy link"
            >
              <Copy className="h-5 w-5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Read more
          </a>
        </div>
        
        {showComments && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Comments</h3>
            
            {article.comments.length > 0 ? (
              <div className="space-y-3 mb-4">
                {article.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.author} • {formatDate(comment.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
            )}
            
            <form onSubmit={handleCommentSubmit} className="flex space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;