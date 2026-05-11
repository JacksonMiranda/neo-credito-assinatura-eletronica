import { useState, useEffect } from 'react';
import styles from './ModalMotivoReprovacao.module.css';

const COMPRIMENTO_MINIMO = 10;

interface Props {
  onConfirm: (motivo: string) => void;
  onCancel: () => void;
}

export default function ModalMotivoReprovacao({ onConfirm, onCancel }: Props) {
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  const valido = motivo.trim().length >= COMPRIMENTO_MINIMO;

  return (
    <div
      className={styles.backdrop}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-reprovacao"
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 id="titulo-reprovacao" className={styles.title}>Motivo da reprovação</h2>
        <p className={styles.hint}>
          Descreva o motivo pelo qual o dossiê está fora da política.
          Mínimo de {COMPRIMENTO_MINIMO} caracteres.
        </p>
        <textarea
          className={styles.textarea}
          rows={5}
          placeholder="Ex.: Selfie diverge do documento. Iluminação insuficiente para validação biométrica."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          aria-label="Motivo da reprovação"
          autoFocus
        />
        <div className={styles.charCount}>
          <span className={valido ? styles.charCountOk : styles.charCountPending}>
            {motivo.trim().length} / {COMPRIMENTO_MINIMO} mínimos
          </span>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button
            className={styles.confirmBtn}
            disabled={!valido}
            onClick={() => valido && onConfirm(motivo.trim())}
          >
            Confirmar reprovação
          </button>
        </div>
      </div>
    </div>
  );
}
