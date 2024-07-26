import { useRef, useEffect, useState, MouseEvent, forwardRef, useImperativeHandle } from 'react';

interface CanvasProps {
  color: string;
  brushSize: number;
  isErasing: boolean;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ color, brushSize, isErasing }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = isErasing ? 'white' : color;
      context.lineWidth = brushSize;
    }
  }, [color, brushSize, isErasing, context]);

  const startDrawing = (event: MouseEvent) => {
    if (context) {
      context.beginPath();
      context.moveTo(event.clientX, event.clientY);
      setIsDrawing(true);
    }
  };

  const draw = (event: MouseEvent) => {
    if (isDrawing && context) {
      context.lineTo(event.clientX, event.clientY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ border: '1px solid black', display: 'block' }}
    />
  );
});
