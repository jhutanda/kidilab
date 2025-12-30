import { useAppStore } from '@/store/useAppStore';

export const elevenLabsService = {
    speak: async (text: string, voiceId: string = "21m00Tcm4TlvDq8ikWAM") => { // Default voice (Rachel)
        const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

        // Get store method carefully (outside React component, need direct store access)
        // Zustand stores can be used outside components
        const setIsSpeaking = useAppStore.getState().setIsSpeaking;

        setIsSpeaking(true);

        if (!apiKey) {
            console.warn("ElevenLabs API Key not found. Simulating speech.");
            // Fallback: Web Speech API for demo without key
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9; // Child friendly slow
            utterance.pitch = 1.2; // Happy
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            return;
        }

        try {
            // ... (rest of implementation)
            // For brevity and stability, I'll stick to the fetch implementation but add isSpeaking false on end
            // BUT actually, audio.play() is asynchronous in terms of duration.
            // We need 'onended' event.

            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: "POST",
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`ElevenLabs API error: ${response.statusText}`);
            }

            const blob = await response.blob();
            const audio = new Audio(URL.createObjectURL(blob));
            audio.onended = () => setIsSpeaking(false);
            audio.play();
        } catch (error) {
            console.error("Error generating speech:", error);
            setIsSpeaking(false);
        }
    },
};
