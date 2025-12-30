interface BackgroundSelectorProps {
    selectedBackground: string;
    onBackgroundSelect: (color: string) => void;
}

const backgrounds = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Light Gray', value: '#F3F4F6' },
    { name: 'Light Blue', value: '#DBEAFE' },
    { name: 'Light Pink', value: '#FCE7F3' },
    { name: 'Light Yellow', value: '#FEF3C7' },
    { name: 'Light Green', value: '#D1FAE5' },
    { name: 'Light Purple', value: '#EDE9FE' },
    { name: 'Light Orange', value: '#FFEDD5' },
];

export function BackgroundSelector({ selectedBackground, onBackgroundSelect }: BackgroundSelectorProps) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-200">
            <h3 className="text-lg font-black text-slate-700 mb-3">🖼️ Background</h3>
            <div className="grid grid-cols-4 gap-2">
                {backgrounds.map((bg) => (
                    <button
                        key={bg.value}
                        onClick={() => onBackgroundSelect(bg.value)}
                        className={`w-12 h-12 rounded-lg transition-all hover:scale-110 border-2 ${selectedBackground === bg.value
                                ? 'ring-4 ring-blue-500 ring-offset-2 scale-110 border-blue-500'
                                : 'border-slate-300 hover:ring-2 hover:ring-slate-300'
                            }`}
                        style={{ backgroundColor: bg.value }}
                        title={bg.name}
                    >
                        {selectedBackground === bg.value && (
                            <span className="text-xl">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
