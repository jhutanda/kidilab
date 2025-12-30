import { motion } from 'framer-motion';
import { Star, Volume2, Home, Gamepad2, Mic, BookOpen, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { useVoiceAssistant } from '@/features/voice/useVoiceAssistant';

export function Navbar() {
    const { setView, currentView, stars } = useAppStore();
    const { isListening, startListening } = useVoiceAssistant();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home', color: 'text-blue-600 bg-blue-100 hover:bg-blue-200' },
        { id: 'alphabet', icon: Gamepad2, label: 'Learn', color: 'text-pink-600 bg-pink-100 hover:bg-pink-200' },
        { id: 'game', icon: Gamepad2, label: 'Game', color: 'text-purple-600 bg-purple-100 hover:bg-purple-200' },
        { id: 'poem', icon: BookOpen, label: 'Poem', color: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200' },
        { id: 'art', icon: Palette, label: 'Art', color: 'text-orange-600 bg-orange-100 hover:bg-orange-200' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
            {/* Gradient Border Wrapper */}
            <div className="max-w-7xl mx-auto rounded-3xl p-[3px] bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
                <div className="bg-white/95 backdrop-blur-xl rounded-[22px] px-6 py-3 flex items-center justify-between">
                    {/* Logo Area */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setView('home')}
                    >
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${isListening ? 'bg-red-400 animate-pulse' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'}`}>
                            {isListening ? <Mic className="text-white w-6 h-6 animate-bounce" /> : <span className="text-2xl font-black text-white">K</span>}
                        </div>
                        <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:block">
                            {isListening ? "Listening..." : "KIDILAB"}
                        </span>
                    </div>

                    {/* Center Navigation Pilled */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id as any)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300",
                                    currentView === item.id
                                        ? `bg-white shadow-md scale-105 ring-2 ring-opacity-50 ${item.color.replace('bg-', 'ring-')}`
                                        : "text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", currentView === item.id ? "" : "opacity-70")} />
                                <span className={cn(currentView === item.id ? "text-slate-800" : "")}>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Stats & Settings */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-200 shadow-sm">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-2 drop-shadow-sm" />
                            <span className="font-black text-yellow-700 text-lg">{stars}</span>
                        </div>

                        <Button size="sm" onClick={startListening} variant={isListening ? 'secondary' : 'outline'} className={`rounded-full w-11 h-11 p-0 flex items-center justify-center border-2 transition-all ${isListening ? 'border-pink-300 bg-pink-50' : 'border-slate-100 hover:border-purple-200 hover:bg-purple-50'}`}>
                            <Mic className={`w-5 h-5 ${isListening ? 'text-pink-600' : 'text-slate-400'}`} />
                        </Button>

                        <Button size="sm" variant="outline" className="rounded-full w-11 h-11 p-0 flex items-center justify-center border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
                            <Volume2 className="w-5 h-5 text-slate-400 hover:text-blue-500" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
