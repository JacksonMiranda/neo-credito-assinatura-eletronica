import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { StatusDossie, DecisaoValidacao } from '../types/dossie';
import { obterDossiePorNumero } from '../data/dossie.mock';
import { LABEL_STATUS_DOSSIE } from '../utils/formatadores';
import SecaoDadosSignatario from '../components/dossie/SecaoDadosSignatario';
import SecaoEvidenciasBiometricas from '../components/dossie/SecaoEvidenciasBiometricas';
import SecaoDecisaoOperador from '../components/dossie/SecaoDecisaoOperador';
import styles from './ValidacaoDossie.module.css';

export default function ValidacaoDossie() {
  const { propostaId } = useParams<{ propostaId?: string }>();

  const dossieInicial = propostaId ? (obterDossiePorNumero(propostaId) ?? null) : null;
  const [dossie, setDossie] = useState(dossieInicial);

  function registrarDecisao(novoStatus: StatusDossie, decisao: DecisaoValidacao) {
    setDossie((prev) => (prev ? { ...prev, status: novoStatus, decisao } : prev));
  }

  // Parâmetro presente, mas não existe dossiê correspondente
  if (!dossie) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Validação do Dossiê</h1>
        </div>
        <div className={styles.notFound}>
          <span className={`material-symbols-outlined ${styles.notFoundIcon}`} aria-hidden="true">
            folder_off
          </span>
          <p className={styles.notFoundTitle}>Dossiê não encontrado</p>
          <p className={styles.notFoundDetail}>
            Não localizamos evidências de assinatura para a proposta{' '}
            <strong>{propostaId}</strong>.
          </p>
          <Link to="/" className={styles.btnVoltar}>
            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            Voltar para o Painel CORBAN
          </Link>
        </div>
      </div>
    );
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
          <SecaoDadosSignatario signatario={dossie.signatario} urlMapa={dossie.evidenciasBiometricas.urlMapa} />
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
