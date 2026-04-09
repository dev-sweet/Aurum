import React from 'react';

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37]/30">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
            <header className="mb-16 border-b border-white/5 pb-8">
                <h1 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4">
                    {title}
                </h1>
                <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                    Last Updated: {lastUpdated}
                </p>
            </header>

            <article className="prose prose-invert prose-gold max-w-none 
        prose-headings:font-serif prose-headings:tracking-widest prose-headings:uppercase
        prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-light
        prose-li:text-gray-400">
                {children}
            </article>
        </div>
    </main>
);