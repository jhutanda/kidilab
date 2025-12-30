interface ColorPaletteProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const colors = [
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Lime', value: '#84CC16' },
    { name: 'Green', value: '#22C55E' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Purple', value: '#A855F7' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Brown', value: '#92400E' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'White', value: '#FFFFFF' },
];

export function ColorPalette({ selectedColor, onColorSelect }: ColorPaletteProps) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-200">
            <h3 className="text-lg font-black text-slate-700 mb-3">🎨 Colors</h3>
            <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => onColorSelect(color.value)}
                        className={`w-14 h-14 rounded-xl transition-all hover:scale-110 border-2 ${selectedColor === color.value
                                ? 'ring-4 ring-blue-500 ring-offset-2 scale-110 border-blue-500'
                                : 'border-slate-200 hover:ring-2 hover:ring-slate-300'
                            }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                    >
                        {selectedColor === color.value && (
                            <span className="text-2xl drop-shadow-lg" style={{
                                color: color.value === '#FFFFFF' || color.value === '#EAB308' ? '#000' : '#FFF'
                            }}>✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
