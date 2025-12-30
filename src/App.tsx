import { MainLayout } from '@/layouts/MainLayout';
import { TeacherAvatar } from '@/components/TeacherAvatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Gamepad2, BookOpen, Sparkles, Loader2, Wand2, Palette } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { AlphabetGrid } from '@/features/alphabet/AlphabetGrid';
import { GameView } from '@/features/game/GameView';
import { NumbersGrid } from '@/features/numbers/NumbersGrid';
import { PoemGrid } from '@/features/poem/PoemGrid';
import { PoemCard } from '@/features/poem/PoemCard';
import { ArtPage } from '@/features/art/ArtPage';
import { useAIPoem } from '@/features/poem/useAIPoem';
import { elevenLabsService } from '@/lib/elevenlabs';
import { useState } from 'react';

function App() {
    const { currentView, setView } = useAppStore();
    const [aiPoems, setAiPoems] = useState<any[]>([]);
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

    const renderContent = () => {
        switch (currentView) {
            case 'alphabet':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => setView('home')}>
                                <ArrowLeft className="w-5 h-5" /> Back
                            </Button>
                            <h2 className="text-3xl font-black text-joy-blue drop-shadow-sm">Alphabet Learning</h2>
                        </div>
                        <AlphabetGrid />
                    </div>
                );
            case 'numbers':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => setView('home')}>
                                <ArrowLeft className="w-5 h-5" /> Back
                            </Button>
                            <h2 className="text-3xl font-black text-joy-pink drop-shadow-sm">Count with Me!</h2>
                        </div>
                        <NumbersGrid />
                    </div>
                );
            case 'game':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => setView('home')}>
                                <ArrowLeft className="w-5 h-5" /> Back
                            </Button>
                        </div>
                        <GameView />
                    </div>
                );
            case 'art':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => setView('home')}>
                                <ArrowLeft className="w-5 h-5" /> Back
                            </Button>
                        </div>
                        <ArtPage />
                    </div>
                );
            case 'poem':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => setView('home')}>
                                <ArrowLeft className="w-5 h-5" /> Back
                            </Button>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-sm">Beautiful Poems</h2>
                        </div>
                        <PoemGrid />
                    </div>
                );
            case 'home':
            default:
                return (
                    <div className="flex-1 flex flex-col items-center justify-center gap-12 animate-in fade-in duration-500">
                        <div className="text-center space-y-4">
                            <TeacherAvatar isSpeaking={false} />
                            <div className="p-4 bg-white/80 backdrop-blur rounded-3xl shadow-sm inline-block max-w-md">
                                <p className="text-2xl font-bold text-slate-700">
                                    "Hello friend! What shall we learn today?"
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl px-4">
                            <Card hoverEffect onClick={() => setView('alphabet')} className="flex flex-col items-center gap-4 cursor-pointer group bg-white border-4 border-joy-blue/20 hover:border-joy-blue shadow-lg hover:shadow-joy-blue/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-24 h-24 bg-joy-blue/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-joy-blue/20">
                                    <span className="text-5xl font-black text-joy-blue">A</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-joy-blue transition-colors">Alphabet</h3>
                                    <p className="text-slate-500 font-medium">Learn A to Z</p>
                                </div>
                                <Button variant="primary" className="w-full mt-2 bg-joy-blue hover:bg-joy-blue/90 border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all" onClick={(e) => { e.stopPropagation(); setView('alphabet'); }}>Start Learning</Button>
                            </Card>

                            <Card hoverEffect onClick={() => setView('numbers')} className="flex flex-col items-center gap-4 cursor-pointer group bg-white border-4 border-joy-pink/20 hover:border-joy-pink shadow-lg hover:shadow-joy-pink/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-24 h-24 bg-joy-pink/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-joy-pink/20">
                                    <span className="text-5xl font-black text-joy-pink">123</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-joy-pink transition-colors">Numbers</h3>
                                    <p className="text-slate-500 font-medium">Count 1 to 100</p>
                                </div>
                                <Button variant="secondary" className="w-full mt-2 bg-joy-pink hover:bg-joy-pink/90 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1 transition-all text-white" onClick={(e) => { e.stopPropagation(); setView('numbers'); }}>Start Counting</Button>
                            </Card>

                            <Card hoverEffect onClick={() => setView('game')} className="flex flex-col items-center gap-4 cursor-pointer group bg-white border-4 border-joy-yellow/20 hover:border-joy-yellow shadow-lg hover:shadow-joy-yellow/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-24 h-24 bg-joy-yellow/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-joy-yellow/20">
                                    <Gamepad2 className="w-12 h-12 text-joy-yellow" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-joy-yellow transition-colors">Play</h3>
                                    <p className="text-slate-500 font-medium">Matching Game</p>
                                </div>
                                <Button variant="accent" className="w-full mt-2 bg-joy-yellow hover:bg-joy-yellow/90 text-yellow-900 border-b-4 border-yellow-500 active:border-b-0 active:translate-y-1 transition-all" onClick={(e) => { e.stopPropagation(); setView('game'); }}>Play Now</Button>
                            </Card>

                            <Card hoverEffect onClick={() => setView('poem')} className="flex flex-col items-center gap-4 cursor-pointer group bg-white border-4 border-joy-purple/20 hover:border-joy-purple shadow-lg hover:shadow-joy-purple/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-24 h-24 bg-joy-purple/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-joy-purple/20">
                                    <BookOpen className="w-12 h-12 text-joy-purple" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-joy-purple transition-colors">Poems</h3>
                                    <p className="text-slate-500 font-medium">Beautiful Rhymes</p>
                                </div>
                                <Button variant="accent" className="w-full mt-2 bg-joy-purple hover:bg-joy-purple/90 text-white border-b-4 border-purple-700 active:border-b-0 active:translate-y-1 transition-all" onClick={(e) => { e.stopPropagation(); setView('poem'); }}>Read Poems</Button>
                            </Card>

                            <Card hoverEffect onClick={() => setView('art')} className="flex flex-col items-center gap-4 cursor-pointer group bg-white border-4 border-orange-400/20 hover:border-orange-400 shadow-lg hover:shadow-orange-400/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-orange-400/20">
                                    <Palette className="w-12 h-12 text-orange-500" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-orange-500 transition-colors">Art</h3>
                                    <p className="text-slate-500 font-medium">Draw & Color</p>
                                </div>
                                <Button variant="accent" className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all" onClick={(e) => { e.stopPropagation(); setView('art'); }}>Start Drawing</Button>
                            </Card>
                        </div>

                        {/* AI Poem Generator Section */}
                        <div className="w-full max-w-4xl px-4 mt-16">
                            <div className="flex flex-col items-center gap-6 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-slate-200 shadow-lg">
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
                                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 max-w-md">
                                        <p className="text-red-700 font-semibold text-sm text-center">
                                            {error}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Display AI Generated Poems */}
                        {aiPoems.length > 0 && (
                            <div className="w-full max-w-6xl px-4 mt-12">
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
                        )}
                    </div>
                );
        }
    };

    return (
        <MainLayout>
            {renderContent()}
        </MainLayout>
    )
}

export default App
