import { useEffect, useRef } from "react";

/**
 * Desktop-only scan reticle cursor with a short luminous trail.
 * Disabled for touch devices and when the user prefers reduced motion.
 */
export function ScanCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    document.documentElement.classList.add("lancapp-cursor-active");

    const ctx = canvas.getContext("2d");
    const trail: { x: number; y: number }[] = [];
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { ...target };
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [role='button'], [data-cursor='interactive']");
    const isTextField = (el: Element | null) => !!el?.closest("input, textarea, [contenteditable]");

    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const text = isTextField(el);
      document.documentElement.classList.toggle("lancapp-cursor-active", !text);
      dot.style.opacity = text ? "0" : "1";
      ring.style.opacity = text ? "0" : "1";
      targetScale = isInteractive(el) ? 1.8 : 1;
    };
    const onDown = () => (targetScale = 0.7);
    const onUp = () => (targetScale = 1);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) frame = requestAnimationFrame(loop);
    };

    const loop = () => {
      if (!visible) return;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      scale += (targetScale - scale) * 0.2;

      dot.style.transform = `translate3d(${target.x - 2}px, ${target.y - 2}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x - 16}px, ${ringPos.y - 16}px, 0) scale(${scale.toFixed(3)})`;

      trail.push({ x: target.x, y: target.y });
      if (trail.length > 18) trail.shift();

      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.lineCap = "round";
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1]!;
          const p1 = trail[i]!;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(183, 255, 60, ${(i / trail.length) * 0.22})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("lancapp-cursor-active");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
      <div
        ref={dotRef}
        className="pointer-events-none absolute left-0 top-0 h-1 w-1 rounded-full bg-primary opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-full border border-primary/60 opacity-0 transition-[border-color] duration-200"
      />
    </div>
  );
}
