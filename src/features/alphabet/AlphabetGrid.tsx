import { useState } from 'react';
import { ALPHABET_DATA } from './AlphabetData';
import { AlphabetCard } from './AlphabetCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function AlphabetGrid() {
    const [caseMode, setCaseMode] = useState<'uppercase' | 'lowercase'>('uppercase');
    const [filterMode, setFilterMode] = useState<'all' | 'vowels' | 'consonants'>('all');

    const filteredData = ALPHABET_DATA.filter(item => {
        if (filterMode === 'all') return true;
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const isVowel = vowels.includes(item.letter);
        return filterMode === 'vowels' ? isVowel : !isVowel;
    });

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white p-2 rounded-2xl shadow-sm border-2 border-slate-100 flex gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        className={caseMode === 'uppercase'
                            ? "bg-joy-blue text-white border-joy-blue shadow-md transform scale-105"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-joy-blue/10 hover:text-joy-blue hover:border-joy-blue"}
                        onClick={() => setCaseMode('uppercase')}
                    >
                        Aa
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={caseMode === 'lowercase'
                            ? "bg-joy-purple text-white border-joy-purple shadow-md transform scale-105"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-joy-purple/10 hover:text-joy-purple hover:border-joy-purple"}
                        onClick={() => setCaseMode('lowercase')}
                    >
                        aa
                    </Button>
                </div>
                <div className="bg-white p-2 rounded-2xl shadow-sm border-2 border-slate-100 flex gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        className={filterMode === 'all'
                            ? "bg-joy-green text-white border-joy-green shadow-md transform scale-105"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-joy-green/10 hover:text-joy-green hover:border-joy-green"}
                        onClick={() => setFilterMode('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={filterMode === 'vowels'
                            ? "bg-joy-pink text-white border-joy-pink shadow-md transform scale-105"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-joy-pink/10 hover:text-joy-pink hover:border-joy-pink"}
                        onClick={() => setFilterMode('vowels')}
                    >
                        Vowels
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className={filterMode === 'consonants'
                            ? "bg-joy-orange text-white border-joy-orange shadow-md transform scale-105"
                            : "bg-white text-slate-400 border-slate-200 hover:bg-joy-orange/10 hover:text-joy-orange hover:border-joy-orange"}
                        onClick={() => setFilterMode('consonants')}
                    >
                        Consonants
                    </Button>
                </div>
            </div>

            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
                {filteredData.map((data) => (
                    <motion.div
                        layout
                        key={data.letter}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ layout: { duration: 0.3 } }}
                    >
                        <AlphabetCard
                            data={data}
                            caseMode={caseMode}
                            onClick={(item) => console.log('Clicked', item.letter)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
