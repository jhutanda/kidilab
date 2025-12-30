import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { artTemplates, ArtTemplate } from './artTemplates';
import { ArtCanvas } from './ArtCanvas';
import { ColorPalette } from './ColorPalette';
import { ToolBar } from './ToolBar';
import { BackgroundSelector } from './BackgroundSelector';

export function ArtPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<ArtTemplate | null>(null);
    const [selectedColor, setSelectedColor] = useState('#EF4444');
    const [tool, setTool] = useState<'brush' | 'eraser' | 'fill' | 'shape' | 'line' | 'spray'>('brush');
    const [brushSize, setBrushSize] = useState(15);
    const [opacity, setOpacity] = useState(1);
    const [clearTrigger, setClearTrigger] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [selectedShape, setSelectedShape] = useState<'circle' | 'square' | 'star' | 'heart' | 'smile'>('circle');

    const handleClear = () => {
        setClearTrigger(prev => prev + 1);
    };

    const handleBackToTemplates = () => {
        setSelectedTemplate(null);
    };

    const handleUndo = () => {
        if ((window as any).artCanvasUndo) {
            (window as any).artCanvasUndo();
        }
    };

    const handleRedo = () => {
        if ((window as any).artCanvasRedo) {
            (window as any).artCanvasRedo();
        }
    };

    if (selectedTemplate) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={handleBackToTemplates}>
                        <ArrowLeft className="w-5 h-5" /> Back to Templates
                    </Button>
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {selectedTemplate.name}
                    </h2>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar - Colors & Backgrounds */}
                    <div className="lg:col-span-2 space-y-4">
                        <ColorPalette
                            selectedColor={selectedColor}
                            onColorSelect={setSelectedColor}
                        />
                        <BackgroundSelector
                            selectedBackground={backgroundColor}
                            onBackgroundSelect={setBackgroundColor}
                        />
                    </div>

                    {/* Middle - Canvas */}
                    <div className="lg:col-span-7 flex justify-center">
                        <ArtCanvas
                            key={clearTrigger}
                            template={selectedTemplate.svg}
                            selectedColor={selectedColor}
                            brushSize={brushSize}
                            opacity={opacity}
                            tool={tool}
                            backgroundColor={backgroundColor}
                            selectedShape={selectedShape}
                        />
                    </div>

                    {/* Right Sidebar - Tools */}
                    <div className="lg:col-span-3">
                        <ToolBar
                            tool={tool}
                            brushSize={brushSize}
                            opacity={opacity}
                            selectedShape={selectedShape}
                            onToolChange={setTool}
                            onBrushSizeChange={setBrushSize}
                            onOpacityChange={setOpacity}
                            onShapeSelect={setSelectedShape}
                            onClear={handleClear}
                            onUndo={handleUndo}
                            onRedo={handleRedo}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    🎨 Art Studio
                </h2>
                <p className="text-slate-600 font-medium text-lg">
                    Choose a template and start coloring!
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {artTemplates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card
                            onClick={() => setSelectedTemplate(template)}
                            className="cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            <div className={`bg-gradient-to-br ${template.color} p-4 h-48 flex items-center justify-center`}>
                                <div
                                    className="w-full h-full bg-white rounded-lg p-2 group-hover:scale-110 transition-transform duration-300"
                                    dangerouslySetInnerHTML={{ __html: template.svg }}
                                />
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="font-black text-slate-800 text-center">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-slate-500 text-center">
                                    {template.category}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
