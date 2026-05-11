import { useState } from 'react';
import type { StatusDossie, DecisaoValidacao } from '../../types/dossie';
import { LABEL_STATUS_DOSSIE } from '../../utils/formatadores';
import DialogoConfirmacao from './DialogoConfirmacao';
import ModalMotivoReprovacao from './ModalMotivoReprovacao';
import styles from './SecaoDecisaoOperador.module.css';

type Etapa = 'idle' | 'confirmApprove' | 'confirmReject' | 'done';

interface Props {
  statusAtual: StatusDossie;
  decisao?: DecisaoValidacao;
  onDecisao: (status: StatusDossie, decisao: DecisaoValidacao) => void;
}

export default function SecaoDecisaoOperador({
  statusAtual,
  decisao,
  onDecisao,
}: Props) {
  const [etapa, setEtapa] = useState<Etapa>('idle');
  const concluido = statusAtual !== 'PENDENTE_VALIDACAO';

  function confirmarAprovacao() {
    const d: DecisaoValidacao = {
      resultado: 'APROVADO',
      dataDecisao: new Date().toISOString(),
    };
    onDecisao('AGUARDANDO_AUDITORIA', d);
    setEtapa('done');
  }

  function confirmarReprovacao(motivo: string) {
    const d: DecisaoValidacao = {
      resultado: 'REPROVADO',
      motivo,
      dataDecisao: new Date().toISOString(),
    };
    onDecisao('REPROVADO', d);
    setEtapa('done');
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Decisão do Operador</h2>

      {concluido ? (
        <div
          className={`${styles.feedback} ${
            decisao?.resultado === 'APROVADO'
              ? styles.feedbackApproved
              : styles.feedbackRejected
          }`}
          role="status"
        >
          <span className={`material-symbols-outlined ${styles.feedbackIcon}`} aria-hidden="true">
            {decisao?.resultado === 'APROVADO' ? 'check_circle' : 'cancel'}
          </span>
          <div>
            <p className={styles.feedbackStatus}>
              {LABEL_STATUS_DOSSIE[statusAtual]}
            </p>
            {decisao?.motivo && (
              <p className={styles.feedbackReason}>Motivo: {decisao.motivo}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.actions}>
          <button
            className={styles.rejectBtn}
            onClick={() => setEtapa('confirmReject')}
            disabled={concluido}
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
            Reprovado — fora da política
          </button>
          <button
            className={styles.approveBtn}
            onClick={() => setEtapa('confirmApprove')}
            disabled={concluido}
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">check</span>
            Aprovado — dentro da política
          </button>
        </div>
      )}

      {etapa === 'confirmApprove' && (
        <DialogoConfirmacao
          titulo="Confirmar aprovação"
          mensagem="Você está prestes a aprovar o dossiê. O status será alterado para Aguardando Auditoria. Deseja continuar?"
          rotuloConfirmar="Confirmar aprovação"
          onConfirm={confirmarAprovacao}
          onCancel={() => setEtapa('idle')}
        />
      )}

      {etapa === 'confirmReject' && (
        <ModalMotivoReprovacao
          onConfirm={confirmarReprovacao}
          onCancel={() => setEtapa('idle')}
        />
      )}
    </section>
  );
}
