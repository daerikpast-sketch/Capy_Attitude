import React from 'react';
import { ArrowDownTrayIcon, PhotoIcon, ShareIcon } from '@heroicons/react/24/outline';

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

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleNativeShare = async () => {
    if (imageUrl && navigator.share) {
      try {
        const blob = dataURItoBlob(imageUrl);
        const file = new File([blob], 'rude-capybara.png', { type: 'image/png' });
        
        const shareData = {
          title: 'Freches Capybara',
          text: 'Mein Capybara hat Attitude! 🖕 Generiert mit Capy-Attitude.',
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            ...shareData,
            files: [file],
          });
        } else {
          await navigator.share({
            ...shareData,
            url: window.location.href
          });
        }
      } catch (err) {
        console.log('Sharing failed or cancelled', err);
      }
    }
  };

  const shareText = encodeURIComponent("Mein Capybara zeigt dir den Mittelfinger! 🖕 Generiert mit AI.");
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="bg-zinc-900 p-3 rounded-2xl shadow-lg border border-zinc-800 flex flex-col gap-3">
      <div className="relative w-full aspect-square bg-zinc-950 rounded-xl overflow-hidden flex items-center justify-center group border border-zinc-800">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 text-center w-full h-full">
            <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
              
              {/* Spinning Capybara Silhouette */}
              <div className="animate-[spin_3s_linear_infinite] origin-center">
                 <svg 
                   viewBox="0 0 100 100" 
                   className="w-20 h-20 text-capy-500 fill-current drop-shadow-[0_0_15px_rgba(139,90,43,0.5)]"
                 >
                   {/* Simplified Capybara Silhouette Path */}
                   <path d="M20,65 C20,65 22,50 35,45 C35,45 38,35 45,35 C52,35 60,38 70,40 C70,40 85,42 90,55 C95,68 90,75 90,75 L85,75 L85,65 L75,65 L75,75 L45,75 L45,65 L35,65 L35,75 L20,75 Z M85,38 C85,38 88,32 82,32 C76,32 78,38 78,38" />
                 </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-display font-bold text-capy-300 mb-2 animate-pulse tracking-wide">
              Generiere...
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">
              Attitude wird geladen
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

      {imageUrl && (
        <div className="grid grid-cols-5 gap-2 pt-1">
          {/* Native Share / Generic */}
          <button 
            onClick={handleNativeShare}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white p-3 rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
            title="Teilen"
          >
            <ShareIcon className="w-5 h-5" />
          </button>

          {/* Twitter / X */}
          <a 
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-black text-zinc-300 hover:text-white p-3 rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
            title="Auf X posten"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-[#1877F2] text-zinc-300 hover:text-white p-3 rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
            title="Auf Facebook teilen"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Instagram (Download trigger) */}
          <button 
            onClick={downloadImage}
            className="bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white p-3 rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
            title="Für Instagram speichern"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.528c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </button>

          {/* WhatsApp */}
          <a 
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-[#25D366] text-zinc-300 hover:text-white p-3 rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
            title="Auf WhatsApp teilen"
          >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
               <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33C8.56 21.52 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.05 16.93c-1.66 0-3.23-.44-4.61-1.2l-.33-.18-2.9.76.78-2.82-.19-.31A7.93 7.93 0 013.85 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8.05zm4.42-6c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.54.12.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" clipRule="evenodd" />
             </svg>
          </a>
        </div>
      )}
    </div>
  );
};