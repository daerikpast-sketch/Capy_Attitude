import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onEnter, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="relative">
      <label htmlFor="prompt" className="block text-sm font-medium text-zinc-400 mb-2">
        Deine Idee (z.B. "als Astronaut im Weltraum")
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-capy-500 focus:border-transparent resize-none text-zinc-100 placeholder-zinc-600 transition-all duration-200"
        placeholder="Ein Capybara, das im Skatepark einen Kickflip macht..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <div className="absolute bottom-3 right-3 text-xs text-zinc-500 pointer-events-none">
        Enter zum Generieren
      </div>
    </div>
  );
};