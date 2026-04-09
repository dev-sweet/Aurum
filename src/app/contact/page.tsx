'use client';

import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic (e.g., API call to Node.js backend)
        console.log('Form Submitted:', formData);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-500/30">
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

                {/* Header Section */}
                <header className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif tracking-[0.2em] uppercase mb-4">
                        Get in <span className="text-[#d4af37]">Touch</span>
                    </h1>
                    <p className="text-gray-500 font-light tracking-widest uppercase text-sm">
                        Bespoke assistance for your digital evolution
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Contact Info */}
                    <section className="space-y-12">
                        <div>
                            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-6">Concierge</h2>
                            <div className="space-y-4 text-gray-400 font-light text-lg">
                                <p>support@trust-os.com</p>
                                <p>+1 (888) 000-LUXE</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-6">Studio</h2>
                            <p className="text-gray-400 font-light text-lg leading-relaxed">
                                123 Innovation Drive<br />
                                Suite 400<br />
                                San Francisco, CA 94103
                            </p>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4">Social</h2>
                            <div className="flex gap-8 text-sm tracking-widest uppercase">
                                <a href="#" className="hover:text-[#d4af37] transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-[#d4af37] transition-colors">Twitter</a>
                                <a href="#" className="hover:text-[#d4af37] transition-colors">GitHub</a>
                            </div>
                        </div>
                    </section>

                    {/* Right: Contact Form */}
                    <section className="bg-[#111] p-8 md:p-12 border border-white/5 rounded-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group relative">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 transition-all group-focus-within:text-[#d4af37]">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] transition-colors font-light"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 transition-all group-focus-within:text-[#d4af37]">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] transition-colors font-light"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 transition-all group-focus-within:text-[#d4af37]">Subject</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] transition-colors font-light"
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 transition-all group-focus-within:text-[#d4af37]">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] transition-colors font-light resize-none"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-12 py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:text-white transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </section>

                </div>
            </div>
        </main>
    );
}