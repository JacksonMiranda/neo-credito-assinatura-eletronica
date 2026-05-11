import { useEffect } from 'react';
import styles from './DialogoConfirmacao.module.css';

interface Props {
  titulo: string;
  mensagem: string;
  rotuloConfirmar?: string;
  rotuloCancelar?: string;
  variante?: 'padrao' | 'perigo';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DialogoConfirmacao({
  titulo,
  mensagem,
  rotuloConfirmar = 'Confirmar',
  rotuloCancelar = 'Cancelar',
  variante = 'padrao',
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      className={styles.backdrop}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-confirmacao"
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 id="titulo-confirmacao" className={styles.title}>{titulo}</h2>
        <p className={styles.message}>{mensagem}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {rotuloCancelar}
          </button>
          <button
            className={`${styles.confirmBtn} ${variante === 'perigo' ? styles.confirmBtnDanger : ''}`}
            onClick={onConfirm}
          >
            {rotuloConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
