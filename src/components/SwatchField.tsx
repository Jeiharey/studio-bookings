import { useEffect, useRef } from "react";

type Swatch = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

const COLORS = [
  "rgba(88, 61, 240, 0.16)",
  "rgba(88, 61, 240, 0.10)",
  "rgba(240, 110, 60, 0.16)",
  "rgba(240, 110, 60, 0.09)",
  "rgba(34, 30, 26, 0.07)",
  "rgba(196, 170, 130, 0.16)",
];

/**
 * Living brand palette: soft floating colour swatches that drift slowly and
 * scatter away from the cursor. Respects prefers-reduced-motion and scales
 * the swatch count down on small / low-power devices.
 */
export function SwatchField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = () => canvas.parentElement?.clientWidth ?? window.innerWidth;
    const height = () => canvas.parentElement?.clientHeight ?? window.innerHeight;

    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
    const count = reduced ? 14 : lowPower ? 22 : 46;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = width();
    let h = height();

    const resize = () => {
      w = width();
      h = height();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const swatches: Swatch[] = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.13, 0.13),
      vy: rand(-0.13, 0.13),
      r: rand(10, lowPower ? 46 : 72),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    }));

    const pointer = { x: -9999, y: -9999, active: false };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of swatches) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }
    };

    const step = () => {
      for (const s of swatches) {
        if (pointer.active) {
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const radius = 190;
          if (dist < radius && dist > 0.001) {
            const force = ((radius - dist) / radius) * 0.5;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        }

        s.vx *= 0.965;
        s.vy *= 0.965;

        // gentle constant drift so the field never fully stops
        s.vx += (Math.random() - 0.5) * 0.006;
        s.vy += (Math.random() - 0.5) * 0.006;

        const max = 1.6;
        s.vx = Math.max(-max, Math.min(max, s.vx));
        s.vy = Math.max(-max, Math.min(max, s.vy));

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -s.r) s.x = w + s.r;
        if (s.x > w + s.r) s.x = -s.r;
        if (s.y < -s.r) s.y = h + s.r;
        if (s.y > h + s.r) s.y = -s.r;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    draw();

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" style={{ filter: "blur(14px)" }} />
    </div>
  );
}
