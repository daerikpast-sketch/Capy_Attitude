import React from 'react';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ImagePreviewProps {
  imageUrl: string | null;
  loading: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, loading }) => {
  
  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `rude-capybara-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-zinc-900 p-3 rounded-2xl shadow-lg border border-zinc-800">
      <div className="relative w-full aspect-square bg-zinc-950 rounded-xl overflow-hidden flex items-center justify-center group border border-zinc-800">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-pulse">
            <div className="w-24 h-24 bg-zinc-800 rounded-full mb-4 animate-bounce flex items-center justify-center text-4xl">
              🦫
            </div>
            <h3 className="text-xl font-display font-bold text-capy-300 mb-2">Wird generiert...</h3>
            <p className="text-zinc-500 max-w-xs">
              Das Capybara bringt gerade seine Attitude in Position.
            </p>
          </div>
        ) : imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt="Freches Capybara" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
               <button 
                onClick={downloadImage}
                className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-capy-100 hover:scale-105 transform transition-all shadow-xl"
               >
                 <ArrowDownTrayIcon className="w-5 h-5" />
                 Herunterladen
               </button>
            </div>
          </>
        ) : (
          <div className="text-center p-8 opacity-50">
            <PhotoIcon className="w-24 h-24 mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-400 font-medium text-lg">Noch kein Capybara in Sicht.</p>
            <p className="text-sm text-zinc-600">Nutze das Formular links.</p>
          </div>
        )}
      </div>
    </div>
  );
};