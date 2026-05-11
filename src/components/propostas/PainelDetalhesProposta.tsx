import { useState } from 'react';
import type { Proposta } from '../../types/proposta';
import {
  formatarData,
  formatarDataSemHora,
  LABEL_CANAL,
  LABEL_RESULTADO_CONTATO,
} from '../../utils/formatadores';
import SeloStatus from './SeloStatus';
import styles from './PainelDetalhesProposta.module.css';

interface Props {
  proposta: Proposta | null;
  onFechar: () => void;
}

const ICONE_CANAL: Record<string, string> = {
  email: 'mail',
  sms: 'sms',
  whatsapp: 'chat',
};

export default function PainelDetalhesProposta({ proposta, onFechar }: Props) {
  const [copiado, setCopiado] = useState(false);

  if (!proposta) return null;

  function copiarLink() {
    navigator.clipboard.writeText(proposta!.link).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onFechar} aria-hidden="true" />
      <aside
        className={styles.painelLateral}
        aria-label="Detalhes da proposta"
        role="complementary"
      >
        <div className={styles.painelHeader}>
          <h2 className={styles.painelTitulo}>Detalhes da Proposta</h2>
          <button
            className={styles.closeBtn}
            onClick={onFechar}
            aria-label="Fechar painel de detalhes"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.summaryNumber}>{proposta.numero}</span>
          <p className={styles.summaryName}>{proposta.nomeCliente}</p>
          <div className={styles.summaryMeta}>
            <SeloStatus status={proposta.status} />
            <span className={styles.summaryDate}>
              {formatarData(proposta.dataUltimoEvento)}
            </span>
          </div>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Link de assinatura</h3>
          <div className={styles.linkRow}>
            <input
              className={styles.linkInput}
              value={proposta.link}
              readOnly
              aria-label="Link de assinatura"
            />
            <button
              className={styles.copyBtn}
              onClick={copiarLink}
              type="button"
              aria-label="Copiar link"
            >
              <span className="material-symbols-outlined">content_copy</span>
              {copiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Data de envio</h3>
          <p className={styles.value}>{formatarDataSemHora(proposta.dataEnvio)}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Log de tentativas de contato</h3>
          {proposta.logTentativasContato.length === 0 ? (
            <p className={styles.empty}>Nenhuma tentativa registrada.</p>
          ) : (
            <ul className={styles.timeline}>
              {proposta.logTentativasContato.map((entrada, idx) => (
                <li key={entrada.id} className={styles.timelineItem}>
                  <div className={styles.timelineLine}>
                    <div className={`${styles.timelineDot} ${styles[`dot_${entrada.canal.toLowerCase()}`]}`} />
                    {idx < proposta.logTentativasContato.length - 1 && (
                      <div className={styles.timelineConnector} />
                    )}
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {ICONE_CANAL[entrada.canal] ?? 'notifications'}
                      </span>
                      <span className={styles.timelineChannel}>
                        {LABEL_CANAL[entrada.canal]}
                      </span>
                      <span className={`${styles.timelineResult} ${styles[`result_${entrada.resultado}`]}`}>
                        {LABEL_RESULTADO_CONTATO[entrada.resultado]}
                      </span>
                    </div>
                    <p className={styles.timelineDate}>{formatarData(entrada.dataHora)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className={styles.painelRodape}>
          <button className={styles.btnOutline} type="button">
            <span className="material-symbols-outlined">send</span>
            Reenviar Link
          </button>
          <button className={styles.btnPrimary} type="button">
            <span className="material-symbols-outlined">download</span>
            Baixar Dossiê
          </button>
        </div>
      </aside>
    </>
  );
}
