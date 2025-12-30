import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { poemsData, Poem } from './PoemData';
import { PoemCard } from './PoemCard';
import { Button } from '@/components/ui/Button';
import { Sparkles, Loader2, BookOpen, Wand2 } from 'lucide-react';
import { useAIPoem } from './useAIPoem';
import { elevenLabsService } from '@/lib/elevenlabs';

export function PoemGrid() {
    const [activeTab, setActiveTab] = useState<'poems' | 'ai'>('poems');
    const [aiPoems, setAiPoems] = useState<Poem[]>([]);
    const { generateNewPoem, isGenerating, error } = useAIPoem();

    const handleGeneratePoem = async () => {
        elevenLabsService.speak("Let me create a brand new poem just for you!");

        const newPoem = await generateNewPoem();
        if (newPoem) {
            setAiPoems([newPoem, ...aiPoems]);

            setTimeout(() => {
                const poemText = `Here's your new poem! ${newPoem.title}. ${newPoem.content.join(' ')}`;
                elevenLabsService.speak(poemText);
            }, 1000);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Tab Navigation */}
            <div className="flex justify-center">
                <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border-2 border-slate-200">
                    <button
                        onClick={() => setActiveTab('poems')}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
                            ${activeTab === 'poems'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                            }
                        `}
                    >
                        <BookOpen className="w-5 h-5" />
                        Poems
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
                            ${activeTab === 'ai'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md scale-105'
                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                            }
                        `}
                    >
                        <Wand2 className="w-5 h-5" />
                        AI Generate Poem
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'poems' ? (
                    <motion.div
                        key="poems"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {poemsData.map((poem, index) => (
                            <PoemCard key={poem.id} poem={poem} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="ai"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* AI Generation Section */}
                        <div className="flex flex-col items-center gap-6 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-slate-200 shadow-inner">
                            <div className="text-center space-y-3 max-w-2xl px-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Sparkles className="w-8 h-8 text-purple-500" />
                                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                        AI Poem Generator
                                    </h3>
                                    <Sparkles className="w-8 h-8 text-pink-500" />
                                </div>
                                <p className="text-slate-700 font-medium text-lg">
                                    Let KIDILAB AI create a unique, child-friendly poem just for you!
                                </p>
                                <p className="text-slate-500 text-sm">
                                    Powered by Google Gemini AI & ElevenLabs Voice
                                </p>
                            </div>

                            <Button
                                onClick={handleGeneratePoem}
                                disabled={isGenerating}
                                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-black text-xl px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Creating Your Poem...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-6 h-6" />
                                            Generate New Poem
                                            <Sparkles className="w-6 h-6" />
                                        </>
                                    )}
                                </span>
                            </Button>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border-2 border-red-200 rounded-xl p-4 max-w-md"
                                >
                                    <p className="text-red-700 font-semibold text-sm text-center">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* AI Generated Poems Grid */}
                        {aiPoems.length > 0 ? (
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-purple-500" />
                                    Your AI-Generated Poems
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {aiPoems.map((poem, index) => (
                                        <PoemCard key={poem.id} poem={poem} index={index} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-4">
                                    <Wand2 className="w-12 h-12 text-slate-400" />
                                </div>
                                <p className="text-slate-500 font-medium text-lg">
                                    No AI poems yet. Click the button above to generate your first poem!
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
