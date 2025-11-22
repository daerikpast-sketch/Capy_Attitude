import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 py-6 px-4 shadow-sm">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-capy-500 rounded-full flex items-center justify-center text-2xl shadow-inner">
            🖕
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-zinc-100 tracking-tight">
              Capy-Attitude
            </h1>
            <p className="text-xs font-bold text-capy-300 tracking-wider uppercase">
              Der ultimative Frechheits-Generator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};