const CareGuide = () => {
    const materials = [
        {
            type: "Fine Leather",
            guide: "Avoid prolonged exposure to direct sunlight and humidity. Clean with a soft, dry cloth. For deep conditioning, use only approved organic leather balms."
        },
        {
            type: "Silk & Satin",
            guide: "Dry clean only. Store in a cool, dark wardrobe within a breathable cotton garment bag. Avoid contact with jewelry that may snag the delicate fibers."
        },
        {
            type: "Precious Metals",
            guide: "Polished surfaces should be wiped after use to remove skin oils. Store in individual velvet-lined compartments to prevent micro-abrasions."
        }
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-24">
                    <h1 className="text-4xl font-serif tracking-[0.4em] uppercase mb-4">The Care Guide</h1>
                    <p className="text-gray-500 italic font-light tracking-widest">Preserving the longevity of your investment pieces.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {materials.map((m, i) => (
                        <div key={i} className="border border-white/10 p-10 bg-[#0c0c0c] flex flex-col items-center text-center">
                            <div className="w-12 h-[1px] bg-[#d4af37] mb-8" />
                            <h2 className="text-xl font-serif mb-6 tracking-wide">{m.type}</h2>
                            <p className="text-gray-400 text-sm leading-loose font-light italic">
                                "{m.guide}"
                            </p>
                        </div>
                    ))}
                </div>

                <footer className="mt-24 text-center border-t border-white/5 pt-12">
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Professional Consultation</p>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed font-light">
                        Should your piece require professional restoration, our master artisans are available for consultation and repair services.
                    </p>
                </footer>
            </div>
        </main>
    );
};

export default CareGuide;