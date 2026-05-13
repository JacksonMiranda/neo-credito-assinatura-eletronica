import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ModalZoomImagem.module.css';

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_INITIAL = 1;

export default function ModalZoomImagem({ src, alt, onClose }: Props) {
  const [zoom, setZoom] = useState(ZOOM_INITIAL);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const canZoomIn = zoom < ZOOM_MAX;
  const canZoomOut = zoom > ZOOM_MIN;

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(z - ZOOM_STEP, ZOOM_MIN);
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(ZOOM_INITIAL);
    setOffset({ x: 0, y: 0 });
  }, []);

  /* Keyboard: ESC, +, -, 0 */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === '+' || e.key === '=') { zoomIn(); return; }
      if (e.key === '-') { zoomOut(); return; }
      if (e.key === '0') { resetZoom(); return; }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, zoomIn, zoomOut, resetZoom]);

  /* Mouse wheel zoom */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [zoomIn, zoomOut]);

  /* Drag to pan */
  function handlePointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    });
  }

  function handlePointerUp() {
    setDragging(false);
  }

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada: ${alt}`}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {/* Toolbar */}
        <div className={styles.toolbar} role="toolbar" aria-label="Controles de zoom">
          <button
            className={styles.toolBtn}
            onClick={zoomIn}
            disabled={!canZoomIn}
            aria-label="Aumentar zoom"
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
          </button>
          <button
            className={styles.toolBtn}
            onClick={zoomOut}
            disabled={!canZoomOut}
            aria-label="Diminuir zoom"
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">remove</span>
          </button>
          <button
            className={styles.toolBtn}
            onClick={resetZoom}
            aria-label="Resetar zoom"
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">fit_screen</span>
          </button>
          <span className={styles.zoomLevel} aria-live="polite">
            {zoomPercent}%
          </span>
          <button
            className={`${styles.toolBtn} ${styles.closeBtn}`}
            onClick={onClose}
            aria-label="Fechar visualização"
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Viewport */}
        <div
          ref={viewportRef}
          className={styles.viewport}
          style={{ cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={src}
            alt={alt}
            className={styles.image}
            draggable={false}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          />
        </div>

        <p className={styles.caption}>{alt}</p>
      </div>
    </div>
  );
}
