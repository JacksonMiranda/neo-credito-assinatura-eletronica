import { useState } from 'react';
import type { EvidenciaBiometrica } from '../../types/dossie';
import ModalZoomImagem from './ModalZoomImagem';
import styles from './SecaoEvidenciasBiometricas.module.css';

interface Props {
  evidencias: EvidenciaBiometrica;
}

export default function SecaoEvidenciasBiometricas({ evidencias }: Props) {
  const [imagemZoom, setImagemZoom] = useState<string | null>(null);
  const [descricaoZoom, setDescricaoZoom] = useState('');

  function abrirZoom(src: string, descricao: string) {
    setImagemZoom(src);
    setDescricaoZoom(descricao);
  }

  const pontuacao = evidencias.pontuacaoSimilaridade;
  const rotuloRisco = pontuacao >= 90 ? 'Risco Baixo' : pontuacao >= 70 ? 'Risco Médio' : 'Risco Alto';
  const rotuloSemelhanca = pontuacao >= 90 ? 'Alta Semelhança' : pontuacao >= 70 ? 'Média Semelhança' : 'Baixa Semelhança';

  return (
    <section className={styles.section}>
      {/* Cabeçalho da pontuação */}
      <div className={styles.scoreHeader}>
        <div>
          <h2 className={styles.title}>Evidências Biométricas</h2>
          <p className={styles.scoreSubtitle}>Análise de Similaridade Facial</p>
        </div>
        <div className={styles.scoreDisplay}>
          <span className={styles.scoreValue}>
            {pontuacao.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
          </span>
          <span className={styles.scoreCaption}>Pontuação de confiança</span>
        </div>
      </div>

      {/* Imagens */}
      <div className={styles.imagesRow}>
        <div className={styles.imageCard}>
          <p className={styles.imageLabel}>Selfie capturada</p>
          <button
            className={styles.imageButton}
            onClick={() => abrirZoom(evidencias.urlSelfie, 'Selfie do assinante')}
            aria-label="Ampliar selfie"
            type="button"
          >
            <img
              src={evidencias.urlSelfie}
              alt="Selfie do assinante"
              className={styles.image}
            />
            <span className={`material-symbols-outlined ${styles.zoomIcon}`} aria-hidden="true">
              zoom_in
            </span>
          </button>
        </div>

        <div className={styles.imageCard}>
          <p className={styles.imageLabel}>Foto do documento</p>
          <button
            className={`${styles.imageButton} ${styles.documentButton}`}
            onClick={() => abrirZoom(evidencias.urlDocumento, 'Documento do assinante')}
            aria-label="Ampliar documento"
            type="button"
          >
            <img
              src={evidencias.urlDocumento}
              alt="Documento do assinante"
              className={`${styles.image} ${styles.documentImage}`}
            />
            <span className={`material-symbols-outlined ${styles.zoomIcon}`} aria-hidden="true">
              zoom_in
            </span>
          </button>
        </div>
      </div>

      {/* Barra de confiança */}
      <div className={styles.confidenceArea}>
        <div className={styles.barLabels}>
          <span className={styles.riskLabel}>{rotuloRisco}</span>
          <span className={styles.similarityLabel}>{rotuloSemelhanca}</span>
        </div>
        <div className={styles.scoreBar}>
          <div
            className={styles.scoreBarFill}
            style={{ width: `${pontuacao}%` }}
            role="progressbar"
            aria-valuenow={pontuacao}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Pontuação de similaridade: ${pontuacao}%`}
          />
        </div>
      </div>

      {imagemZoom && (
        <ModalZoomImagem
          src={imagemZoom}
          alt={descricaoZoom}
          onClose={() => setImagemZoom(null)}
        />
      )}
    </section>
  );
}
