import { useState } from 'react';
import { geminiService } from '@/lib/gemini';
import { Poem } from './PoemData';

export function useAIPoem() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateNewPoem = async (theme?: string): Promise<Poem | null> => {
        setIsGenerating(true);
        setError(null);

        try {
            const poemData = await geminiService.generatePoem(theme);

            // Create a new Poem object
            const newPoem: Poem = {
                id: Date.now(),
                title: poemData.title,
                author: poemData.author,
                content: poemData.content,
                color: getRandomGradient()
            };

            return newPoem;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate poem');
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        generateNewPoem,
        isGenerating,
        error
    };
}

// Helper function for random gradient colors
function getRandomGradient(): string {
    const gradients = [
        'from-pink-400 to-rose-500',
        'from-purple-400 to-indigo-500',
        'from-blue-400 to-cyan-500',
        'from-green-400 to-emerald-500',
        'from-yellow-400 to-orange-500',
        'from-red-400 to-pink-500',
        'from-teal-400 to-cyan-500',
        'from-violet-400 to-purple-500',
        'from-fuchsia-400 to-pink-500',
        'from-lime-400 to-green-500'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}
