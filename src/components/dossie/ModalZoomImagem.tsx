import { useEffect } from 'react';
import styles from './ModalZoomImagem.module.css';

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ModalZoomImagem({ src, alt, onClose }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada: ${alt}`}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar visualização"
        >
          ✕
        </button>
        <img src={src} alt={alt} className={styles.image} />
        <p className={styles.caption}>{alt}</p>
      </div>
    </div>
  );
}
