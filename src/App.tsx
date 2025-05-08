import React from 'react';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import { useNews } from './hooks/useNews';

function App() {
  const { 
    articles, 
    isLoading, 
    error, 
    refreshNews, 
    likeArticle, 
    addComment 
  } = useNews();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onRefresh={refreshNews} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Latest Updates: Indian Military Activities
                </h1>
              </div>
              
              <NewsFeed
                articles={articles}
                isLoading={isLoading}
                error={error}
                onLike={likeArticle}
                onComment={addComment}
              />
            </section>
            
            <VideoSection />
          </div>
          
          <aside className="w-full md:w-1/4 space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">About This Platform</h2>
              <p className="text-gray-700">
                Stay informed about the latest developments in Indian military activities and their impact on Pakistan.
                Our platform provides real-time updates from reliable sources.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Stay Updated</h2>
              <p className="text-gray-700 mb-4">
                Get instant notifications about critical updates and breaking news.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App