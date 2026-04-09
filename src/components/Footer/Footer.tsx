import { collections } from "@/data/products";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

// Footer
export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] border-t border-[rgba(201,168,76,0.1)]">
            <div className="max-w-[1800px] mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <span className="font-display text-2xl text-[#C9A84C] tracking-[0.2em]">AURUM</span>
                        <p className="text-[#8A8075] mt-4 text-sm leading-relaxed">
                            Crafted for the Exceptional
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-[#8A8075] hover:text-[#C9A84C] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[#8A8075] hover:text-[#C9A84C] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Collections */}
                    <div>
                        <p className="label-uppercase text-[#F5F0E8] text-xs mb-6">Collections</p>
                        <ul className="space-y-3">
                            {collections.map((col) => (
                                <li key={col.id}>
                                    <a href={`#collection-${col.slug}`} className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">
                                        {col.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Client Services */}
                    <div>
                        <p className="label-uppercase text-[#F5F0E8] text-xs mb-6">Client Services</p>
                        <ul className="space-y-3">
                            <li><Link href="/contact" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Contact Us</Link></li>
                            <li><Link href="/shipping-returns" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Shipping & Returns</Link></li>
                            <li><Link href="/care-guide" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Care Guide</Link></li>
                            <li><Link href="/size-guide" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Size Guide</Link></li>
                            <li><Link href="/appointment" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Book Appointment</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <p className="label-uppercase text-[#F5F0E8] text-xs mb-6">Legal</p>
                        <ul className="space-y-3">
                            <li><Link href="/privacy-policy" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Cookie Policy</Link></li>
                            <li><Link href="/accessibility" className="text-[#8A8075] hover:text-[#F5F0E8] transition-colors text-sm">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[rgba(201,168,76,0.1)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#8A8075] text-sm">© 2025 AURUM. All rights reserved.</p>
                    <p className="text-[#8A8075] text-sm">Crafted with intention</p>
                </div>
            </div>
        </footer>
    );
}
