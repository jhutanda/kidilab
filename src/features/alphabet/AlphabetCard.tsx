import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { LetterData } from './AlphabetData';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { elevenLabsService } from '@/lib/elevenlabs';
import confetti from 'canvas-confetti';

interface AlphabetCardProps {
    data: LetterData;
    onClick: (data: LetterData) => void;
    caseMode?: 'uppercase' | 'lowercase';
}

export function AlphabetCard({ data, onClick, caseMode = 'uppercase' }: AlphabetCardProps) {
    const handleClick = (e: React.MouseEvent) => {
        // Trigger confetti
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y }
        });

        const wordToSpeak = caseMode === 'lowercase' ? data.wordSmall : data.word;
        elevenLabsService.speak(`${data.letter} is for ${wordToSpeak}!`);
        onClick(data);
    };

    const displayLetter = caseMode === 'lowercase' ? data.letter.toLowerCase() : data.letter;
    const displayWord = caseMode === 'lowercase' ? data.wordSmall : data.word;
    const displayEmoji = caseMode === 'lowercase' ? data.emojiSmall : data.emoji;

    return (
        <Card
            hoverEffect
            onClick={handleClick}
            className="cursor-pointer group relative overflow-hidden flex flex-col items-center justify-between p-4 h-48 sm:h-56"
        >
            <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity", data.color)} />

            <div className="z-10 w-full flex justify-between items-start">
                <span className={cn("text-4xl sm:text-5xl font-black", data.color.split(' ')[1])}>
                    {displayLetter}
                </span>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/50 p-2 rounded-full backdrop-blur-sm"
                >
                    <Volume2 className="w-5 h-5 text-slate-400" />
                </motion.div>
            </div>

            <motion.div
                className="z-10 text-6xl sm:text-7xl drop-shadow-lg"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            >
                {displayEmoji}
            </motion.div>

            <div className="z-10 w-full text-center">
                <p className="text-lg font-bold text-slate-700">{displayWord}</p>
            </div>
        </Card>
    );
}
