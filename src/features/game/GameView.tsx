import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { elevenLabsService } from '@/lib/elevenlabs';
import { useAppStore } from '@/store/useAppStore';
import { ALPHABET_DATA } from '../alphabet/AlphabetData';
import confetti from 'canvas-confetti';

// --- Themes ---
const THEMES = [
    { bg: 'bg-joy-blue', border: 'border-blue-600', text: 'text-white' },
    { bg: 'bg-joy-pink', border: 'border-pink-600', text: 'text-white' },
    { bg: 'bg-joy-yellow', border: 'border-yellow-600', text: 'text-amber-900' },
    { bg: 'bg-joy-green', border: 'border-green-600', text: 'text-white' },
    { bg: 'bg-joy-purple', border: 'border-purple-600', text: 'text-white' },
    { bg: 'bg-joy-orange', border: 'border-orange-600', text: 'text-white' },
    { bg: 'bg-red-500', border: 'border-red-700', text: 'text-white' },
    { bg: 'bg-cyan-500', border: 'border-cyan-700', text: 'text-white' },
    { bg: 'bg-lime-500', border: 'border-lime-700', text: 'text-white' },
    { bg: 'bg-indigo-500', border: 'border-indigo-700', text: 'text-white' },
    { bg: 'bg-fuchsia-500', border: 'border-fuchsia-700', text: 'text-white' },
    { bg: 'bg-rose-500', border: 'border-rose-700', text: 'text-white' },
];

// --- Draggable Letter Component ---
function DraggableLetter({ id, letter, matched, theme }: { id: string, letter: string, matched: boolean, theme: typeof THEMES[0] }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: matched,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    if (matched) return null; // Hide if already matched

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="z-50 cursor-grab active:cursor-grabbing touch-none">
            <div className={`w-20 h-20 rounded-2xl shadow-lg border-4 flex items-center justify-center text-4xl font-black hover:scale-110 transition-transform ${theme.bg} ${theme.border} ${theme.text}`}>
                {letter}
            </div>
        </div>
    );
}

// --- Droppable Basket Component ---
function DroppableBasket({ id, label, icon, accepted }: { id: string, label: string, icon: string, accepted: string }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: { accepted },
    });

    return (
        <div
            ref={setNodeRef}
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${isOver ? 'bg-green-100 border-green-400 scale-105' : 'bg-white/50 border-slate-300'
                }`}
        >
            <span className="text-6xl drop-shadow-md">{icon}</span>
            <span className="text-lg font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full">{label}</span>
        </div>
    );
}

// --- Helper to Generate Random Level ---
const generateLevel = () => {
    // Pick 3 random distinct items
    const shuffled = [...ALPHABET_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return {
        items: selected.map(item => ({
            id: `item-${item.letter}`,
            letter: item.letter,
            matched: false,
            theme: THEMES[Math.floor(Math.random() * THEMES.length)]
        })).sort(() => 0.5 - Math.random()), // Shuffle items display order
        baskets: selected.map(item => ({
            id: `basket-${item.letter}`,
            label: item.word,
            icon: item.emoji,
            accepted: item.letter
        })).sort(() => 0.5 - Math.random()) // Shuffle baskets display order
    };
};

// --- Main Game Component ---
export function GameView() {
    const { addStars } = useAppStore();
    const [, setScore] = useState(0);
    const [levelData, setLevelData] = useState(generateLevel());
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [caseMode, setCaseMode] = useState<'uppercase' | 'lowercase'>('uppercase');

    // Destructure for easier access
    const { items, baskets } = levelData;

    const setItems = (newItems: typeof items | ((prev: typeof items) => typeof items)) => {
        setLevelData(prev => ({
            ...prev,
            items: typeof newItems === 'function' ? newItems(prev.items) : newItems
        }));
    };

    const triggerCheerUp = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,

        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        // Add optional sound effect if available in elevenlabs or just TTS
        elevenLabsService.speak("Yay! Awesome!");
    }

    const handlePlayAgain = () => {
        setLevelData(generateLevel());
        setScore(0);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        // Check if correct match
        const droppedLetter = items.find(i => i.id === active.id)?.letter;
        const targetBasket = baskets.find(b => b.id === over.id);

        if (droppedLetter && targetBasket && droppedLetter === targetBasket.accepted) {
            // Success!
            const letterToSpeak = caseMode === 'lowercase' ? droppedLetter.toLowerCase() : droppedLetter;
            elevenLabsService.speak(`Great job! ${letterToSpeak} is for ${targetBasket.label}!`);
            setItems(prev => prev.map(item => item.id === active.id ? { ...item, matched: true } : item));

            setScore(s => s + 1);
            addStars(10);
        } else {
            // Fail
            elevenLabsService.speak(`Oops! Try again.`);
        }
    };

    const allMatched = items.every(i => i.matched);

    useEffect(() => {
        if (allMatched) {
            triggerCheerUp();
        }
    }, [allMatched]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
                {/* Top Controls */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border-2 border-slate-100 flex gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        className={caseMode === 'uppercase'
                            ? "bg-blue-100 text-blue-700 border-blue-400 shadow-md ring-2 ring-blue-200 ring-offset-2"
                            : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200"}
                        onClick={() => setCaseMode('uppercase')}
                    >
                        Aa
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={caseMode === 'lowercase'
                            ? "bg-purple-100 text-purple-700 border-purple-400 shadow-md ring-2 ring-purple-200 ring-offset-2"
                            : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-purple-50 hover:text-purple-500 hover:border-purple-200"}
                        onClick={() => setCaseMode('lowercase')}
                    >
                        aa
                    </Button>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-700">Match the Letters!</h2>
                    <p className="text-slate-500 font-medium">Drag the letter to the matching picture</p>
                </div>

                {/* Baskets Area */}
                <div className="flex flex-wrap justify-center gap-8">
                    {baskets.map(basket => {
                        const letterData = ALPHABET_DATA.find(l => l.letter === basket.accepted);
                        const displayLabel = caseMode === 'lowercase' && letterData ? letterData.wordSmall : basket.label;
                        const displayIcon = caseMode === 'lowercase' && letterData ? letterData.emojiSmall : basket.icon;

                        return (
                            <div key={basket.id} className="relative">
                                <DroppableBasket
                                    {...basket}
                                    label={displayLabel}
                                    icon={displayIcon}
                                />
                                {/* Show matched letter in basket if done */}
                                {items.find(i => i.letter === basket.accepted && i.matched) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    >
                                        <div className="text-8xl font-black text-green-500 opacity-50">
                                            {caseMode === 'lowercase' ? basket.accepted.toLowerCase() : basket.accepted}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Letters Area */}
                <div className="min-h-[120px] w-full bg-slate-100/50 rounded-3xl p-6 flex flex-wrap justify-center gap-6 border-2 border-slate-200 border-dashed">
                    <AnimatePresence>
                        {items.map(item => (
                            !item.matched && (
                                <DraggableLetter
                                    key={item.id}
                                    {...item}
                                    letter={caseMode === 'lowercase' ? item.letter.toLowerCase() : item.letter}
                                />
                            )
                        ))}
                    </AnimatePresence>
                    {allMatched && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-600 mb-4">You did it! 🎉</h3>
                            <div className="flex gap-4 justify-center">
                                <Button onClick={handlePlayAgain} variant="primary">Play Again</Button>
                                <Button onClick={triggerCheerUp} variant="accent" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-500">
                                    <PartyPopper className="w-5 h-5 mr-2" />
                                    Cheer!
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="flex justify-center mt-8">
                    <motion.button
                        onClick={() => {
                            setIsRegenerating(true);
                            setTimeout(() => setIsRegenerating(false), 500);
                            handlePlayAgain();
                        }}
                        animate={isRegenerating ? {
                            scale: [1, 1.2, 0.9, 1.1, 1],
                            rotate: [0, -10, 10, -5, 5, 0]
                        } : {}}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-joy-blue via-joy-purple to-joy-pink text-white rounded-full font-bold shadow-xl border-4 border-white/50 hover:border-white transition-all ring-offset-2 hover:ring-2 ring-joy-purple"
                    >
                        <RotateCcw className={`w-6 h-6 transition-transform duration-500 ${isRegenerating ? 'animate-spin' : 'group-hover:-rotate-180'}`} />
                        <span className="text-xl tracking-wide">Mix it up!</span>
                    </motion.button>
                </div>
            </div>
        </DndContext>
    );
}

