import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { elevenLabsService } from '@/lib/elevenlabs';
import { cn } from '@/lib/utils';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';

const NUMBERS = Array.from({ length: 100 }, (_, i) => i + 1);
const RANGES = [
    { label: '1-10', min: 1, max: 10 },
    { label: '11-20', min: 11, max: 20 },
    { label: '21-30', min: 21, max: 30 },
    { label: '31-40', min: 31, max: 40 },
    { label: '41-50', min: 41, max: 50 },
    { label: '51-60', min: 51, max: 60 },
    { label: '61-70', min: 61, max: 70 },
    { label: '71-80', min: 71, max: 80 },
    { label: '81-90', min: 81, max: 90 },
    { label: '91-100', min: 91, max: 100 },
];

export function NumbersGrid() {
    const [activeRange, setActiveRange] = useState(RANGES[0]);

    const filteredNumbers = NUMBERS.filter(
        n => n >= activeRange.min && n <= activeRange.max
    );

    return (
        <div className="w-full space-y-8">
            {/* Range Pagination / Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/50 backdrop-blur rounded-3xl border-2 border-slate-100 shadow-sm max-w-5xl mx-auto">
                {RANGES.map((range) => {
                    const isActive = activeRange.label === range.label;
                    return (
                        <Button
                            key={range.label}
                            variant="ghost"
                            onClick={() => setActiveRange(range)}
                            className={cn(
                                "rounded-full px-4 py-2 font-bold transition-all",
                                isActive
                                    ? "bg-joy-blue text-white shadow-joy-blue/30 shadow-lg scale-105"
                                    : "bg-white text-slate-500 hover:bg-joy-blue/10 hover:text-joy-blue"
                            )}
                        >
                            {range.label}
                        </Button>
                    );
                })}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 max-w-6xl mx-auto"
            >
                <AnimatePresence mode="popLayout">
                    {filteredNumbers.map((num, i) => (
                        <NumberCard key={num} number={num} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

function NumberCard({ number, index }: { number: number, index: number }) {
    // Modern Joyful Palette cycling
    const themes = [
        { bg: 'bg-joy-blue', text: 'text-white', shadow: 'shadow-joy-blue/40' },
        { bg: 'bg-joy-pink', text: 'text-white', shadow: 'shadow-joy-pink/40' },
        { bg: 'bg-joy-yellow', text: 'text-amber-900', shadow: 'shadow-joy-yellow/40' },
        { bg: 'bg-joy-green', text: 'text-white', shadow: 'shadow-joy-green/40' },
        { bg: 'bg-joy-purple', text: 'text-white', shadow: 'shadow-joy-purple/40' },
        { bg: 'bg-joy-orange', text: 'text-white', shadow: 'shadow-joy-orange/40' },
    ];

    const theme = themes[(number - 1) % themes.length];

    const handleClick = (e: React.MouseEvent) => {
        // Trigger confetti
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 60,
            spread: 60,
            origin: { x, y },
            colors: ['#4CC9F0', '#F72585', '#FFD60A', '#70E000']
        });

        elevenLabsService.speak(`${number}`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.05
            }}
        >
            <div
                onClick={handleClick}
                className={cn(
                    "relative aspect-square cursor-pointer group rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300",
                    "hover:-translate-y-2 hover:rotate-1 shadow-xl hover:shadow-2xl active:scale-95",
                    theme.bg,
                    theme.shadow
                )}
            >
                {/* 3D-ish highlight */}
                <div className="absolute inset-0 rounded-[2rem] ring-inset ring-4 ring-white/20" />

                {/* Shine effect */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rotate-45 transform pointer-events-none" />

                <span className={cn("text-6xl sm:text-7xl font-black z-10 drop-shadow-md", theme.text)}>
                    {number}
                </span>

                {/* Audio Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/30 p-2 rounded-full backdrop-blur-sm">
                    <Volume2 className={cn("w-5 h-5", theme.text === 'text-white' ? 'text-white' : 'text-amber-900')} />
                </div>

                {/* Dots only for small numbers to keep it clean */}
                {number <= 10 && (
                    <div className="absolute bottom-6 flex gap-1.5 ">
                        {Array.from({ length: number }).map((_, i) => (
                            <div key={i} className={cn("w-2 h-2 rounded-full bg-white/60")} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
