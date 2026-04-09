'use client';
import React, { useState } from 'react';

const BookAppointment = () => {
    const [selectedService, setSelectedService] = useState('Bespoke Consultation');

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-3xl font-serif tracking-[0.3em] uppercase mb-4">Private Appointment</h1>
                    <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mb-6" />
                    <p className="text-gray-500 font-light italic">Tailored experiences in our studios or via digital presence.</p>
                </header>

                <form className="space-y-12">
                    {/* Service Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['In-Studio Styling', 'Virtual Showcase', 'Bespoke Fitting', 'Gift Advisory'].map((service) => (
                            <button
                                key={service}
                                type="button"
                                onClick={() => setSelectedService(service)}
                                className={`py-4 px-6 border text-xs uppercase tracking-widest transition-all duration-500 ${selectedService === service
                                    ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5'
                                    : 'border-white/10 text-gray-500 hover:border-white/30'
                                    }`}
                            >
                                {service}
                            </button>
                        ))}
                    </div>

                    {/* Details */}
                    <div className="space-y-8 pt-8">
                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition">Preferred Date & Time</label>
                            <input type="datetime-local" className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] font-light text-gray-300" />
                        </div>

                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-[#d4af37] transition">Personal Style Notes</label>
                            <textarea placeholder="Tell us about your requirements..." rows={3} className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#d4af37] font-light text-gray-300 resize-none" />
                        </div>

                        <button className="w-full py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#d4af37] hover:text-white transition-all">
                            Request Invitation
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default BookAppointment;