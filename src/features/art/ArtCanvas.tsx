import { useState, useRef, useEffect } from 'react';

interface ArtCanvasProps {
    template: string;
    selectedColor: string;
    brushSize: number;
    opacity: number;
    tool: 'brush' | 'eraser' | 'fill' | 'shape' | 'line' | 'spray';
    backgroundColor: string;
    selectedShape: 'circle' | 'square' | 'star' | 'heart' | 'smile';
}

export function ArtCanvas({ template, selectedColor, brushSize, opacity, tool, backgroundColor, selectedShape }: ArtCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [historyStep, setHistoryStep] = useState(-1);
    const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
    const [tempCanvas, setTempCanvas] = useState<ImageData | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        setCtx(context);

        // Set canvas size
        canvas.width = 600;
        canvas.height = 600;

        // Draw template
        drawTemplate(context);
    }, [template, backgroundColor]);

    const drawTemplate = (context: CanvasRenderingContext2D) => {
        // Clear canvas
        context.clearRect(0, 0, 600, 600);

        // Draw background color
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 600, 600);

        // Draw SVG template
        const img = new Image();
        const svgBlob = new Blob([template], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            context.drawImage(img, 0, 0, 600, 600);
            URL.revokeObjectURL(url);
            saveToHistory(context);
        };
        img.src = url;
    };

    const saveToHistory = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, 600, 600);
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(imageData);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
    };

    const undo = () => {
        if (historyStep > 0 && ctx) {
            const newStep = historyStep - 1;
            ctx.putImageData(history[newStep], 0, 0);
            setHistoryStep(newStep);
        }
    };

    const redo = () => {
        if (historyStep < history.length - 1 && ctx) {
            const newStep = historyStep + 1;
            ctx.putImageData(history[newStep], 0, 0);
            setHistoryStep(newStep);
        }
    };

    // Expose undo/redo to parent
    useEffect(() => {
        (window as any).artCanvasUndo = undo;
        (window as any).artCanvasRedo = redo;
    }, [historyStep, history]);

    const drawShape = (x: number, y: number) => {
        if (!ctx) return;

        const size = brushSize * 2;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = selectedColor;
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2;

        switch (selectedShape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'square':
                ctx.fillRect(x - size, y - size, size * 2, size * 2);
                break;
            case 'star':
                drawStar(ctx, x, y, 5, size, size / 2);
                break;
            case 'heart':
                drawHeart(ctx, x, y, size);
                break;
            case 'smile':
                drawSmile(ctx, x, y, size);
                break;
        }
        ctx.globalAlpha = 1;
        saveToHistory(ctx);
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        if (!ctx) return;

        ctx.globalAlpha = opacity;
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.globalAlpha = 1;
        saveToHistory(ctx);
    };

    const sprayPaint = (x: number, y: number) => {
        if (!ctx) return;

        ctx.globalAlpha = opacity * 0.3;
        ctx.fillStyle = selectedColor;

        const density = 20;
        const radius = brushSize;

        for (let i = 0; i < density; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;

            ctx.fillRect(px, py, 2, 2);
        }

        ctx.globalAlpha = 1;
    };

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
    };

    const drawSmile = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        // Face
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Eyes
        ctx.fillStyle = selectedColor;
        ctx.beginPath();
        ctx.arc(x - size / 3, y - size / 4, size / 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size / 3, y - size / 4, size / 8, 0, Math.PI * 2);
        ctx.fill();

        // Smile
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI, false);
        ctx.stroke();
    };

    const floodFill = (x: number, y: number, fillColor: string) => {
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, 600, 600);
        const pixels = imageData.data;
        const targetColor = getPixelColor(pixels, x, y);
        const fillRGB = hexToRgb(fillColor);

        if (!fillRGB || colorsMatch(targetColor, fillRGB)) return;

        const stack: [number, number][] = [[x, y]];
        const visited = new Set<string>();

        while (stack.length > 0) {
            const [cx, cy] = stack.pop()!;
            const key = `${cx},${cy}`;

            if (visited.has(key)) continue;
            if (cx < 0 || cx >= 600 || cy < 0 || cy >= 600) continue;

            const currentColor = getPixelColor(pixels, cx, cy);
            if (!colorsMatch(currentColor, targetColor)) continue;

            visited.add(key);
            setPixelColor(pixels, cx, cy, fillRGB);

            stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
        }

        ctx.putImageData(imageData, 0, 0);
        saveToHistory(ctx);
    };

    const getPixelColor = (pixels: Uint8ClampedArray, x: number, y: number) => {
        const index = (y * 600 + x) * 4;
        return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
    };

    const setPixelColor = (pixels: Uint8ClampedArray, x: number, y: number, color: number[]) => {
        const index = (y * 600 + x) * 4;
        pixels[index] = color[0];
        pixels[index + 1] = color[1];
        pixels[index + 2] = color[2];
        pixels[index + 3] = 255;
    };

    const colorsMatch = (a: number[], b: number[]) => {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    };

    const hexToRgb = (hex: string): number[] | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    };

    const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return null;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX: number;
        let clientY: number;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left) * (canvas.width / rect.width);
        const y = (clientY - rect.top) * (canvas.height / rect.height);

        return { x, y };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const coords = getCanvasCoords(e);
        if (!coords) return;

        if (tool === 'fill') {
            floodFill(Math.floor(coords.x), Math.floor(coords.y), selectedColor);
            return;
        }
        if (tool === 'shape') {
            drawShape(coords.x, coords.y);
            return;
        }
        if (tool === 'line') {
            if (!lineStart) {
                setLineStart(coords);
                if (ctx) {
                    setTempCanvas(ctx.getImageData(0, 0, 600, 600));
                }
            }
            return;
        }

        setIsDrawing(true);
        if (tool === 'spray') {
            sprayPaint(coords.x, coords.y);
        } else {
            draw(e);
        }
    };

    const stopDrawing = () => {
        if (tool === 'line' && lineStart) {
            // Line is completed on second click
            return;
        }

        if (isDrawing && ctx && tool !== 'spray') {
            saveToHistory(ctx);
        }
        setIsDrawing(false);
        if (ctx) {
            ctx.beginPath();
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const coords = getCanvasCoords(e);
        if (!coords) return;

        if (tool === 'line' && lineStart) {
            // Preview line
            if (ctx && tempCanvas) {
                ctx.putImageData(tempCanvas, 0, 0);
                ctx.globalAlpha = opacity;
                ctx.strokeStyle = selectedColor;
                ctx.lineWidth = brushSize;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(lineStart.x, lineStart.y);
                ctx.lineTo(coords.x, coords.y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
            return;
        }

        if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
        if (!ctx) return;

        if (tool === 'spray') {
            sprayPaint(coords.x, coords.y);
            return;
        }

        ctx.globalAlpha = opacity;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = selectedColor;
        }

        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);

        ctx.globalAlpha = 1;
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (tool === 'line' && lineStart) {
            const coords = getCanvasCoords(e);
            if (!coords) return;

            drawLine(lineStart.x, lineStart.y, coords.x, coords.y);
            setLineStart(null);
            setTempCanvas(null);
        }
    };

    const saveDrawing = () => {
        if (!canvasRef.current) return;

        const link = document.createElement('a');
        link.download = 'my-artwork.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onClick={handleClick}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="border-4 border-slate-300 rounded-xl shadow-xl cursor-crosshair bg-white"
                style={{ maxWidth: '100%', height: 'auto', touchAction: 'none' }}
            />

            <button
                onClick={saveDrawing}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
                💾 Save My Artwork
            </button>
        </div>
    );
}
