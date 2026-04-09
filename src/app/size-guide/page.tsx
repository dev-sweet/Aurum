const SizeGuide = () => {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif tracking-[0.3em] uppercase mb-16 text-center">Size & Fit</h1>

                <div className="flex flex-col space-y-20">
                    <section>
                        <div className="flex justify-between items-baseline mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-[#d4af37] uppercase tracking-widest text-sm font-bold">Women's Collection</h2>
                            <span className="text-[10px] text-gray-500">ALL MEASUREMENTS IN INCHES</span>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-center py-4 border-b border-white/5 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                            <div>Size</div><div>Chest</div><div>Waist</div><div>Hip</div>
                        </div>
                        {[
                            ['XS', '32-33', '24-25', '34-35'],
                            ['S', '34-35', '26-27', '36-37'],
                            ['M', '36-37', '28-29', '38-39'],
                            ['L', '38-40', '30-32', '40-42']
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-4 gap-4 text-center py-6 border-b border-white/5 text-sm font-light text-gray-300">
                                <div className="font-bold text-white uppercase tracking-widest">{row[0]}</div>
                                <div>{row[1]}</div><div>{row[2]}</div><div>{row[3]}</div>
                            </div>
                        ))}
                    </section>

                    <section className="bg-[#111] p-12 border border-white/5">
                        <h3 className="text-white uppercase tracking-widest mb-6">How to Measure</h3>
                        <ul className="space-y-6 text-sm text-gray-400 font-light list-disc list-inside">
                            <li><strong className="text-white">Chest:</strong> Measure around the fullest part of your chest, keeping the tape level.</li>
                            <li><strong className="text-white">Waist:</strong> Measure around your natural waistline, usually the narrowest part.</li>
                            <li><strong className="text-white">Hip:</strong> Stand with feet together and measure around the fullest point.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SizeGuide;