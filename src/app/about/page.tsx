'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function AboutSection() {
    const milestones = [
        { year: '2010', event: 'AURUM founded in Geneva' },
        { year: '2014', event: 'First flagship boutique opens' },
        { year: '2018', event: 'Introduction of The Obsidian Series' },
        { year: '2022', event: 'Carbon-neutral certification' },
        { year: '2025', event: 'Global expansion continues' }
    ];

    return (
        <section id="about" className="py-24 px-6 bg-[#0A0A0A]">
            <div className="max-w-6xl mx-auto">
                {/* Hero Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">Our Story</h2>
                    <p className="text-[#8A8075] max-w-3xl mx-auto leading-relaxed">
                        AURUM was born from a singular vision: to create objects that transcend time.
                        Founded in Geneva in 2010, we have remained steadfast in our commitment to
                        exceptional craftsmanship, rare materials, and timeless design. Each piece
                        that leaves our atelier is not merely a product—it is a legacy.
                    </p>
                </motion.div>

                {/* Founder's Letter */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <div className="aspect-[4/5] relative overflow-hidden bg-[#161616]">
                        <Image
                            src="/products/desk-1.jpg"
                            alt="Founder"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="space-y-6">
                        <p className="label-uppercase text-[#C9A84C] tracking-[0.3em]">A Letter from the Founder</p>
                        <p className="text-[#8A8075] leading-relaxed">
                            "When I founded AURUM, I made a promise: that we would never compromise on quality,
                            never chase trends, and never forget that our clients trust us to create pieces
                            worthy of becoming family heirlooms. Fifteen years later, that promise remains
                            the foundation of everything we do."
                        </p>
                        <p className="text-[#F5F0E8] font-display italic text-xl">— Alexandre Durand</p>
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h3 className="font-display text-2xl text-[#F5F0E8] text-center mb-12">Our Journey</h3>
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C9A84C] via-[rgba(201,168,76,0.3)] to-transparent hidden md:block" />
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={milestone.year} className={cn(
                                    "flex items-center gap-8",
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                )}>
                                    <div className={cn(
                                        "flex-1 text-right",
                                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    )}>
                                        <p className="font-display text-2xl text-[#C9A84C]">{milestone.year}</p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-[#C9A84C] relative z-10" />
                                    <div className="flex-1">
                                        <p className="text-[#F5F0E8]">{milestone.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Press */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="label-uppercase text-[#8A8075] tracking-[0.3em] mb-8">As Seen In</p>
                    <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
                        {['VOGUE', 'FT', 'WSJ', 'FORBES', 'GQ'].map((publication) => (
                            <span key={publication} className="font-display text-2xl text-[#F5F0E8]">{publication}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}