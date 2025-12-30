import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Shield, Info } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';

export function Footer() {
    const { setView } = useAppStore();

    return (
        <footer className="w-full mt-auto relative pt-1">
            {/* Top Gradient Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />

            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-pink-50/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                    K
                                </div>
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">KIDILAB</span>
                            </div>
                            <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-xs">
                                Empowering young minds with AI-powered interactive learning adventures. Speak, Play, and Grow!
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-5">
                            <h3 className="font-extrabold text-indigo-900 text-lg">Explore</h3>
                            <ul className="space-y-3">
                                <li>
                                    <button onClick={() => setView('home')} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 font-semibold transition-all duration-200 block">Home</button>
                                </li>
                                <li>
                                    <button onClick={() => setView('alphabet')} className="text-slate-500 hover:text-pink-600 hover:translate-x-1 font-semibold transition-all duration-200 block">Alphabet</button>
                                </li>
                                <li>
                                    <button onClick={() => setView('numbers')} className="text-slate-500 hover:text-purple-600 hover:translate-x-1 font-semibold transition-all duration-200 block">Numbers</button>
                                </li>
                                <li>
                                    <button onClick={() => setView('game')} className="text-slate-500 hover:text-orange-600 hover:translate-x-1 font-semibold transition-all duration-200 block">Play Game</button>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="space-y-5">
                            <h3 className="font-extrabold text-indigo-900 text-lg">Support</h3>
                            <ul className="space-y-3">
                                <li>
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors group">
                                        <Info className="w-4 h-4 group-hover:scale-110 transition-transform" /> About Us
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors group">
                                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" /> Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors group">
                                        <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" /> Privacy Policy
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div className="space-y-5">
                            <h3 className="font-extrabold text-indigo-900 text-lg">Follow Us</h3>
                            <div className="flex gap-3">
                                <button className="p-2.5 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 bg-pink-100 text-pink-500 rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <Instagram className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 bg-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <Youtube className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mt-6 bg-white/50 w-fit px-3 py-1.5 rounded-full border border-slate-100">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
                                <span>for Kids</span>
                            </div>
                        </div>
                    </div>

                    {/* Glowing Copyright */}
                    <div className="pt-8 border-t border-indigo-100 text-center">
                        <p className="font-bold text-lg cursor-default">
                            <span className="text-slate-400">&copy; 2025</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-1">KIDILAB</span> <span className="text-slate-400 text-sm font-semibold">All rights reserved.</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
