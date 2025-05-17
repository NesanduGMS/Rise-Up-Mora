import { useEffect } from 'react';

const useCanvasCursor = () => {
  // Define proper TypeScript types for our constructors
  class NoiseGenerator {
    phase: number;
    offset: number;
    frequency: number;
    amplitude: number;

    constructor(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
      this.phase = options.phase || 0;
      this.offset = options.offset || 0;
      this.frequency = options.frequency || 0.001;
      this.amplitude = options.amplitude || 1;
    }

    update() {
      this.phase += this.frequency;
      return this.offset + Math.sin(this.phase) * this.amplitude;
    }

    value() {
      return this.offset + Math.sin(this.phase) * this.amplitude;
    }
  }

  class Node {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
  }

  // Set up state variables
  let ctx: CanvasRenderingContext2D | null = null;
  let noiseGen: NoiseGenerator | null = null;
  const pos: { x: number, y: number } = { x: 0, y: 0 };
  let lines: Line[] = [];
  const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  class Line {
    spring: number;
    friction: number;
    nodes: Node[];

    constructor(options: { spring?: number } = {}) {
      this.spring = (options.spring || 0.4) + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      
      for (let i = 0; i < E.size; i++) {
        const node = new Node();
        node.x = pos.x;
        node.y = pos.y;
        this.nodes.push(node);
      }
    }

    update() {
      let springFactor = this.spring;
      const firstNode = this.nodes[0];
      
      firstNode.vx += (pos.x - firstNode.x) * springFactor;
      firstNode.vy += (pos.y - firstNode.y) * springFactor;
      
      for (let i = 0, len = this.nodes.length; i < len; i++) {
        const currentNode = this.nodes[i];
        
        if (i > 0) {
          const prevNode = this.nodes[i - 1];
          currentNode.vx += (prevNode.x - currentNode.x) * springFactor;
          currentNode.vy += (prevNode.y - currentNode.y) * springFactor;
          currentNode.vx += prevNode.vx * E.dampening;
          currentNode.vy += prevNode.vy * E.dampening;
        }
        
        currentNode.vx *= this.friction;
        currentNode.vy *= this.friction;
        currentNode.x += currentNode.vx;
        currentNode.y += currentNode.vy;
        
        springFactor *= E.tension;
      }
    }

    draw() {
      // Return early if context is null
      if (!ctx) return;
      
      let x = this.nodes[0].x;
      let y = this.nodes[0].y;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      
      for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
        const curr = this.nodes[i];
        const next = this.nodes[i + 1];
        
        x = 0.5 * (curr.x + next.x);
        y = 0.5 * (curr.y + next.y);
        
        ctx.quadraticCurveTo(curr.x, curr.y, x, y);
      }
      
      // Make sure we have enough nodes before accessing
      if (this.nodes.length >= 2) {
        const secondLast = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        
        ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
      }
      
      ctx.stroke();
      ctx.closePath();
    }
  }

  function onMousemove(e: MouseEvent | TouchEvent) {
    function initLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    function handlePointerEvent(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if ('clientX' in e && 'clientY' in e) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      e.preventDefault();
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }

    document.removeEventListener('mousemove', onMousemove as EventListener);
    document.removeEventListener('touchstart', onMousemove as EventListener);
    document.addEventListener('mousemove', handlePointerEvent as EventListener);
    document.addEventListener('touchmove', handlePointerEvent as EventListener);
    document.addEventListener('touchstart', handleTouchStart as EventListener);
    
    handlePointerEvent(e);
    initLines();
    render();
  }

  function render() {
    if (!ctx || !ctx.canvas || !noiseGen) return;
    
    const customCtx = ctx as any;
    if (customCtx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      
      // Fast color cycling options:
      
      // OPTION 1: Faster noise-based cycling (medium speed)
      // const hue = Math.round(noiseGen.update() * 5); // Increased by factor of 5
      
      // OPTION 2: Fast time-based cycling (fast)
      const hue = Math.round(Date.now() * 0.05 % 360);
      
      // OPTION 3: Ultra-fast time-based cycling with dual color flash (very fast)
      // const time = Date.now() * 0.1;
      // const isGoldish = Math.sin(time) > 0;
      
      // Standard calculation based on hue
      const isGoldish = (hue % 360) > 180;
      
      if (isGoldish) {
        // Gold/amber color (matches the f1c232 gold used in the site)
        ctx.strokeStyle = 'hsla(45, 88%, 60%, 0.3)';
      } else {
        // Teal/blue color (matches the dark-blue theme)
        ctx.strokeStyle = 'hsla(200, 70%, 45%, 0.3)';
      }
      
      // You could also use a more advanced gradient approach for smoother transitions:
      // const blendFactor = (Math.sin(Date.now() * 0.003) + 1) / 2; // 0 to 1 value that changes over time
      // ctx.strokeStyle = `hsla(${45 + 155 * blendFactor}, 80%, 50%, 0.3)`;
      
      ctx.lineWidth = 1;
      
      for (let i = 0; i < E.trails; i++) {
        const line = lines[i];
        line.update();
        line.draw();
      }
      
      customCtx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    if (ctx && ctx.canvas) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
  }

  const renderCanvas = function() {
    const canvas = document.getElementById('cursor-canvas') as HTMLCanvasElement | null;
    if (!canvas) return { handleFocus: () => {}, handleBlur: () => {} };
    
    ctx = canvas.getContext('2d');
    if (!ctx) return { handleFocus: () => {}, handleBlur: () => {} };

    // Add the running property to the context
    const customCtx = ctx as any;
    customCtx.running = true;
    customCtx.frame = 1;
    
    noiseGen = new NoiseGenerator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    
    document.addEventListener('mousemove', onMousemove as EventListener);
    document.addEventListener('touchstart', onMousemove as EventListener);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    
    // Focus and blur event listeners
    const handleFocus = () => {
      if (ctx && !(ctx as any).running) {
        (ctx as any).running = true;
        render();
      }
    };
    
    const handleBlur = () => {
      if (ctx) {
        (ctx as any).running = true;
      }
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    resizeCanvas();
    
    // Return cleanup functions for the effect
    return { handleFocus, handleBlur };
  };

  useEffect(() => {
    const handlers = renderCanvas();
    const handleFocus = handlers?.handleFocus;
    const handleBlur = handlers?.handleBlur;

    return () => {
      if (ctx) (ctx as any).running = false;
      document.removeEventListener('mousemove', onMousemove as EventListener);
      document.removeEventListener('touchstart', onMousemove as EventListener);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      if (handleFocus) window.removeEventListener('focus', handleFocus);
      if (handleBlur) window.removeEventListener('blur', handleBlur);
    };
  }, []);
};

export default useCanvasCursor;