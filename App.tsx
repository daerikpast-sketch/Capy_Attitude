import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImagePreview } from './components/ImagePreview';
import { generateCapybaraImage } from './services/geminiService';
import { ArrowPathIcon, ExclamationTriangleIcon, ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('Photorealistic');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const randomPrompts = [
    "als DJ auf einer riesigen Techno-Party",
    "reitet auf einem T-Rex durch New York",
    "im Weltraumanzug auf dem Mond",
    "als König auf einem Thron aus Wassermelonen",
    "beim Skateboarden in einem aktiven Vulkan",
    "als 5-Sterne Koch beim Zubereiten von Sushi",
    "als Rapper mit dicker Goldkette in einem Musikvideo",
    "beim Yoga im tiefsten Dschungel",
    "als cooler Hacker in einem Cyberpunk-Labor",
    "beim Entspannen in einem Whirlpool voller Orangen",
    "als Piratenkapitän auf hoher See",
    "als CEO bei einem wichtigen Business-Meeting"
  ];

  const styles = ['Photorealistic', 'Cartoon', 'Oil Painting', 'Pixel Art', '3D Render'];

  const handleGenerate = async (overridePrompt?: string, overrideStyle?: string) => {
    const promptToUse = overridePrompt ?? prompt;
    const styleToUse = overrideStyle ?? style;

    if (!promptToUse.trim()) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImage = await generateCapybaraImage(promptToUse, styleToUse);
      setImageUrl(generatedImage);
    } catch (err: any) {
      console.error(err);
      // Display the actual error message to help debugging
      setError(err.message || "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    setPrompt(randomPrompt);
    setStyle(randomStyle);
    
    // Trigger generation directly with new values
    handleGenerate(randomPrompt, randomStyle);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-zinc-200 bg-black">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800">
              <h2 className="text-2xl font-display font-semibold mb-4 text-capy-300">
                Dein Szenario
              </h2>
              <p className="text-zinc-400 mb-4 text-sm">
                Beschreibe die Umgebung oder das Outfit des Capybaras. 
                <br/>
                <span className="font-bold text-capy-300">Hinweis:</span> Das Capybara wird automatisch so generiert, dass es den Mittelfinger zeigt.
              </p>
              
              <div className="space-y-5">
                <PromptInput 
                  value={prompt} 
                  onChange={setPrompt} 
                  onEnter={() => handleGenerate()}
                  disabled={loading}
                />

                <div className="relative">
                  <label htmlFor="style-select" className="block text-sm font-medium text-zinc-400 mb-2">
                    Bildstil
                  </label>
                  <div className="relative">
                    <select
                      id="style-select"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-capy-500 focus:border-transparent appearance-none text-zinc-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {styles.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                  <button
                    onClick={() => handleGenerate()}
                    disabled={loading || !prompt.trim()}
                    className={`py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md
                      ${loading || !prompt.trim() 
                        ? 'bg-zinc-700 cursor-not-allowed' 
                        : 'bg-capy-500 hover:bg-capy-400 hover:shadow-xl active:transform active:scale-95'
                      }`}
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="h-6 w-6 animate-spin" />
                        Generiere...
                      </>
                    ) : (
                      <>
                        Bild Generieren
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleRandom}
                    disabled={loading}
                    className="py-4 px-6 rounded-xl bg-zinc-800 text-capy-300 font-bold text-lg border border-zinc-700 hover:bg-zinc-700 hover:text-capy-200 hover:border-capy-500 transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:transform active:scale-95 whitespace-nowrap"
                    title="Zufälliges Bild erzeugen"
                  >
                    <SparklesIcon className="h-6 w-6" />
                    <span className="hidden sm:inline">Überrasch mich</span>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg animate-fade-in">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-red-300 break-words w-full">
                    <p className="font-bold mb-1">Fehler aufgetreten:</p>
                    <p className="text-sm font-mono bg-black/30 p-2 rounded">{error}</p>
                    <p className="text-xs mt-2 text-red-400">
                      Falls hier "403" oder "API Key" steht: Prüfe deine Vercel Environment Variables.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Preview */}
          <div className="order-1 lg:order-2 sticky top-6">
            <ImagePreview imageUrl={imageUrl} loading={loading} />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-zinc-600 text-sm">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
};

export default App;