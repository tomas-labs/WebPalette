import { useState, useRef } from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';

export const App = () => {
  const [color, setColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setIsErasing(false);
  };

  const handleBrushSizeChange = (newSize: number) => {
    setBrushSize(newSize);
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const handleToggleErase = () => {
    setIsErasing(!isErasing);
  };

  return (
    <div>
      <Toolbar
        onColorChange={handleColorChange}
        onBrushSizeChange={handleBrushSizeChange}
        onClear={handleClear}
        onToggleErase={handleToggleErase}
        isErasing={isErasing}
      />
      <Canvas ref={canvasRef} color={color} brushSize={brushSize} isErasing={isErasing} />
    </div>
  );
};
