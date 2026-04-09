import React from 'react';

const ShippingReturns = () => {
    const shippingMethods = [
        { method: 'Complimentary Standard', time: '3-5 Business Days', price: 'Free' },
        { method: 'Express Concierge', time: '1-2 Business Days', price: '$25.00' },
        { method: 'Next-Day Delivery', time: 'Ordered by 12PM', price: '$45.00' },
        { method: 'International Priority', time: '5-9 Business Days', price: 'Calculated' },
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif tracking-[0.3em] uppercase mb-16 text-center border-b border-white/10 pb-8">Logistics & Returns</h1>

                <section className="mb-20">
                    <h2 className="text-[#d4af37] tracking-widest uppercase text-sm mb-8">Shipping Methodologies</h2>
                    <div className="overflow-hidden border border-white/5 bg-[#111]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
                                    <th className="p-6">Method</th>
                                    <th className="p-6">Transit Time</th>
                                    <th className="p-6 text-right">Investment</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-light text-gray-300">
                                {shippingMethods.map((s, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                                        <td className="p-6 font-medium text-white">{s.method}</td>
                                        <td className="p-6">{s.time}</td>
                                        <td className="p-6 text-right">{s.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-gray-400 font-light">
                    <div>
                        <h3 className="text-white uppercase tracking-widest mb-4">Our Return Philosophy</h3>
                        <p className="mb-4">We offer a 14-day complimentary return window for all unused items. Each piece must remain in its original condition with all security seals and tags perfectly intact.</p>
                        <p>To initiate a return, please access your private dashboard or contact our concierge for a pre-paid white-glove pickup.</p>
                    </div>
                    <div>
                        <h3 className="text-white uppercase tracking-widest mb-4">Sustainability Commitment</h3>
                        <p className="mb-4">In our effort to reduce carbon footprints, we utilize FSC-certified eco-luxe packaging. We encourage batch shipping whenever possible.</p>
                        <p>Fragrance and personalized bespoke items are final sale and cannot be returned due to their unique nature.</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ShippingReturns;