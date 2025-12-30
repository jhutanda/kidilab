import { Paintbrush, Eraser, Trash2, PaintBucket, Undo2, Redo2, Circle, Square, Star, Heart, Smile, Minus, Sparkles } from 'lucide-react';

interface ToolBarProps {
    tool: 'brush' | 'eraser' | 'fill' | 'shape' | 'line' | 'spray';
    brushSize: number;
    opacity: number;
    selectedShape: 'circle' | 'square' | 'star' | 'heart' | 'smile';
    onToolChange: (tool: 'brush' | 'eraser' | 'fill' | 'shape' | 'line' | 'spray') => void;
    onBrushSizeChange: (size: number) => void;
    onOpacityChange: (opacity: number) => void;
    onShapeSelect: (shape: 'circle' | 'square' | 'star' | 'heart' | 'smile') => void;
    onClear: () => void;
    onUndo: () => void;
    onRedo: () => void;
}

export function ToolBar({
    tool,
    brushSize,
    opacity,
    selectedShape,
    onToolChange,
    onBrushSizeChange,
    onOpacityChange,
    onShapeSelect,
    onClear,
    onUndo,
    onRedo
}: ToolBarProps) {
    const brushSizes = [
        { label: 'S', value: 5 },
        { label: 'M', value: 15 },
        { label: 'L', value: 30 },
        { label: 'XL', value: 50 },
    ];

    const opacityLevels = [
        { label: '25%', value: 0.25 },
        { label: '50%', value: 0.5 },
        { label: '75%', value: 0.75 },
        { label: '100%', value: 1 },
    ];

    const shapes = [
        { name: 'circle', icon: Circle, label: 'Circle' },
        { name: 'square', icon: Square, label: 'Square' },
        { name: 'star', icon: Star, label: 'Star' },
        { name: 'heart', icon: Heart, label: 'Heart' },
        { name: 'smile', icon: Smile, label: 'Smile' },
    ];

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-slate-200 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div>
                <h3 className="text-lg font-black text-slate-700 mb-3">🛠️ Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => onToolChange('brush')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'brush'
                                ? 'bg-blue-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Paintbrush className="w-5 h-5" />
                        Brush
                    </button>
                    <button
                        onClick={() => onToolChange('eraser')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'eraser'
                                ? 'bg-pink-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Eraser className="w-5 h-5" />
                        Eraser
                    </button>
                    <button
                        onClick={() => onToolChange('fill')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'fill'
                                ? 'bg-purple-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <PaintBucket className="w-5 h-5" />
                        Fill
                    </button>
                    <button
                        onClick={() => onToolChange('shape')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'shape'
                                ? 'bg-orange-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Star className="w-5 h-5" />
                        Shapes
                    </button>
                    <button
                        onClick={() => onToolChange('line')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'line'
                                ? 'bg-green-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Minus className="w-5 h-5" />
                        Line
                    </button>
                    <button
                        onClick={() => onToolChange('spray')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl font-bold transition-all text-xs ${tool === 'spray'
                                ? 'bg-cyan-500 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Sparkles className="w-5 h-5" />
                        Spray
                    </button>
                </div>
            </div>

            {/* Shapes Selection */}
            {tool === 'shape' && (
                <div>
                    <h3 className="text-sm font-black text-slate-700 mb-2">⭐ Shapes</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {shapes.map((shape) => {
                            const Icon = shape.icon;
                            return (
                                <button
                                    key={shape.name}
                                    onClick={() => onShapeSelect(shape.name as any)}
                                    className={`p-2 rounded-lg transition-all flex flex-col items-center gap-1 ${selectedShape === shape.name
                                            ? 'bg-orange-500 text-white scale-105'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    title={shape.label}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-xs font-bold">{shape.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-sm font-black text-slate-700 mb-2">📏 Size</h3>
                <div className="grid grid-cols-2 gap-2">
                    {brushSizes.map((size) => (
                        <button
                            key={size.value}
                            onClick={() => onBrushSizeChange(size.value)}
                            className={`py-2 px-2 rounded-xl font-bold text-xs transition-all ${brushSize === size.value
                                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {size.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-black text-slate-700 mb-2">💧 Opacity</h3>
                <div className="grid grid-cols-2 gap-2">
                    {opacityLevels.map((level) => (
                        <button
                            key={level.value}
                            onClick={() => onOpacityChange(level.value)}
                            className={`py-2 px-2 rounded-xl font-bold text-xs transition-all ${opacity === level.value
                                    ? 'bg-indigo-500 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {level.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-black text-slate-700 mb-2">↩️ History</h3>
                <div className="flex gap-2">
                    <button
                        onClick={onUndo}
                        className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-2 rounded-xl transition-all hover:scale-105"
                    >
                        <Undo2 className="w-4 h-4" />
                        <span className="text-xs">Undo</span>
                    </button>
                    <button
                        onClick={onRedo}
                        className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-2 rounded-xl transition-all hover:scale-105"
                    >
                        <Redo2 className="w-4 h-4" />
                        <span className="text-xs">Redo</span>
                    </button>
                </div>
            </div>

            <button
                onClick={onClear}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all hover:scale-105"
            >
                <Trash2 className="w-5 h-5" />
                <span className="text-sm">Clear Canvas</span>
            </button>
        </div>
    );
}
