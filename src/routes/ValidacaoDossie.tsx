import { useState } from 'react';
import type { StatusDossie, DecisaoValidacao } from '../types/dossie';
import { dossie as dossieInicial } from '../data/dossie.mock';
import { LABEL_STATUS_DOSSIE } from '../utils/formatadores';
import SecaoDadosSignatario from '../components/dossie/SecaoDadosSignatario';
import SecaoEvidenciasBiometricas from '../components/dossie/SecaoEvidenciasBiometricas';
import SecaoDecisaoOperador from '../components/dossie/SecaoDecisaoOperador';
import styles from './ValidacaoDossie.module.css';

export default function ValidacaoDossie() {
  const [dossie, setDossie] = useState(dossieInicial);

  function registrarDecisao(novoStatus: StatusDossie, decisao: DecisaoValidacao) {
    setDossie((prev) => ({ ...prev, status: novoStatus, decisao }));
  }

  return (
    <div className={styles.page}>
      {/* Inline header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Validação do Dossiê</h1>
        <div className={styles.headerMeta}>
          <span className={styles.propNumber}>{dossie.numeroProposta}</span>
          <span className={styles.sep} aria-hidden="true">|</span>
          <span className={styles.clientName}>{dossie.nomeCliente}</span>
          <span className={styles.sep} aria-hidden="true">|</span>
          <span className={`${styles.statusBadge} ${styles[`status_${dossie.status}`]}`}>
            {LABEL_STATUS_DOSSIE[dossie.status]}
          </span>
        </div>
      </div>

      {/* 2-col grid */}
      <div className={styles.grid}>
        <div className={styles.colLeft}>
          <SecaoDadosSignatario signatario={dossie.signatario} />
          <SecaoDecisaoOperador
            statusAtual={dossie.status}
            decisao={dossie.decisao}
            onDecisao={registrarDecisao}
          />
        </div>
        <div className={styles.colRight}>
          <SecaoEvidenciasBiometricas evidencias={dossie.evidenciasBiometricas} />
        </div>
      </div>
    </div>
  );
}
