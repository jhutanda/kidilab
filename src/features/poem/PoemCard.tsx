import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Poem } from './PoemData';
import { Volume2 } from 'lucide-react';
import { elevenLabsService } from '@/lib/elevenlabs';
import confetti from 'canvas-confetti';

interface PoemCardProps {
    poem: Poem;
    index: number;
}

export function PoemCard({ poem, index }: PoemCardProps) {
    const handleClick = (e: React.MouseEvent) => {
        // Trigger confetti
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 80,
            spread: 60,
            origin: { x, y },
            colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']
        });

        // Read the poem aloud
        const poemText = `${poem.title} by ${poem.author}. ${poem.content.join(' ')}`;
        elevenLabsService.speak(poemText);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
        >
            <Card
                onClick={handleClick}
                className="h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-slate-200 hover:border-slate-300"
            >
                {/* Header with gradient */}
                <div className={`relative p-6 bg-gradient-to-r ${poem.color}`}>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-2xl font-black text-white drop-shadow-md mb-2 line-clamp-2">
                                {poem.title}
                            </h3>
                            <p className="text-sm font-semibold text-white/90 italic">
                                by {poem.author}
                            </p>
                        </div>

                        {/* Audio Button */}
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <Volume2 className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </div>

                {/* Poem Content */}
                <div className="p-6 flex-1 bg-gradient-to-b from-white to-slate-50">
                    <div className="space-y-3">
                        {poem.content.map((line, idx) => (
                            <p
                                key={idx}
                                className="text-slate-700 font-medium text-base leading-relaxed"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Footer accent */}
                <div className={`h-1.5 bg-gradient-to-r ${poem.color} group-hover:h-2 transition-all duration-300`} />
            </Card>
        </motion.div>
    );
}
