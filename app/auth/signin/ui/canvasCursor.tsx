import { useEffect, useRef } from 'react';
import useCanvasCursor from '../../hooks/useCanvasCursor';

const CanvasCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasCursor();

  return (
    <canvas 
      ref={canvasRef}
      id="cursor-canvas" 
      className="pointer-events-none fixed inset-0 z-50" 
      style={{ opacity: 0.7 }}
    />
  );
};

export default CanvasCursor;