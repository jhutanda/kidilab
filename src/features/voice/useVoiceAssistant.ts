import { useState, useCallback } from 'react';
import { elevenLabsService } from '@/lib/elevenlabs';
import { useAppStore } from '@/store/useAppStore';
import { ALPHABET_DATA } from '@/features/alphabet/AlphabetData';

export function useVoiceAssistant() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const { setView } = useAppStore();

    const startListening = useCallback(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser doesn't support speech recognition. Try Chrome!");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            handleCommand(text);
        };

        recognition.start();
    }, []);

    const handleCommand = (text: string) => {
        const lowerText = text.toLowerCase();
        console.log("Heard:", lowerText);

        // Intent: Teach me [Letter]
        const letterMatch = lowerText.match(/teach me ([a-z])/i) || lowerText.match(/what is ([a-z])/i);

        if (letterMatch) {
            const letter = letterMatch[1].toUpperCase();
            const data = ALPHABET_DATA.find(l => l.letter === letter);
            if (data) {
                setView('alphabet'); // Switch view first
                // Wait a bit for view switch then speak
                setTimeout(() => {
                    elevenLabsService.speak(`${data.letter} is for ${data.word}! ${data.letter}!`);
                }, 500);
                return;
            }
        }

        // Intent: Navigation
        if (lowerText.includes('home')) {
            setView('home');
            elevenLabsService.speak("Going home!");
            return;
        }
        if (lowerText.includes('numbers') || lowerText.includes('count')) {
            setView('numbers');
            elevenLabsService.speak("Let's count together!");
            return;
        }
        if (lowerText.includes('game') || lowerText.includes('play')) {
            setView('game');
            elevenLabsService.speak("Let's play a matching game!");
            return;
        }

        // Fallback
        elevenLabsService.speak("I didn't quite catch that, friend.");
    };

    return { isListening, transcript, startListening };
}
