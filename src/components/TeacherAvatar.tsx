import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function TeacherAvatar({ isSpeaking: propSpeaking }: { isSpeaking?: boolean }) {
    const { isSpeaking: globalSpeaking } = useAppStore();
    const isSpeaking = propSpeaking || globalSpeaking;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-full h-full"
            >
                {/* Simple Cute Robot Vector via SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <circle cx="100" cy="100" r="90" className="fill-white stroke-4 stroke-slate-100" />
                    <circle cx="100" cy="100" r="80" className="fill-pastel-blue" />

                    {/* Face */}
                    <motion.g
                        animate={isSpeaking ? { y: [0, 2, 0] } : {}}
                    >
                        {/* Eyes */}
                        <circle cx="70" cy="90" r="10" className="fill-slate-800" />
                        <circle cx="130" cy="90" r="10" className="fill-slate-800" />
                        {/* Highlights */}
                        <circle cx="73" cy="87" r="3" className="fill-white" />
                        <circle cx="133" cy="87" r="3" className="fill-white" />

                        {/* Mouth */}
                        {isSpeaking ? (
                            <motion.ellipse
                                cx="100" cy="130" rx="20" ry="15"
                                className="fill-slate-800"
                                animate={{ ry: [10, 20, 10] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                            />
                        ) : (
                            <path d="M 70 130 Q 100 150 130 130" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        )}
                    </motion.g>

                    {/* Antenna */}
                    <path d="M 100 20 L 100 0" stroke="#94a3b8" strokeWidth="4" />
                    <circle cx="100" cy="0" r="8" className="fill-red-400 animate-pulse" />
                </svg>
            </motion.div>
        </div>
    );
}
