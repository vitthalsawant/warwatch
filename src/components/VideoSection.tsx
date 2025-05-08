import React from 'react';

// This is a placeholder component for a video section
// In a real implementation, you would need to extract videos from the news content
// or use a dedicated video API

const VideoSection: React.FC = () => {
  // Sample video data - in a real app, this would come from an API
  const videos = [
    {
      id: '1',
      title: 'Latest tensions at India-Pakistan border',
      thumbnail: 'https://images.pexels.com/photos/9830747/pexels-photo-9830747.jpeg',
      source: 'News Channel',
      duration: '2:45',
      url: '#'
    },
    {
      id: '2',
      title: 'Analysis of military movements',
      thumbnail: 'https://images.pexels.com/photos/6156067/pexels-photo-6156067.jpeg',
      source: 'Military Tribune',
      duration: '5:12',
      url: '#'
    },
    {
      id: '3',
      title: 'Peace talks breakdown: What happened?',
      thumbnail: 'https://images.pexels.com/photos/2451564/pexels-photo-2451564.jpeg',
      source: 'Peace Monitor',
      duration: '8:30',
      url: '#'
    }
  ];

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Latest Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {video.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;