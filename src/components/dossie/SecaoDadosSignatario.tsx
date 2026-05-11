import type { DadosSignatario } from '../../types/dossie';
import { formatarData, formatarCpf, formatarCoordenadas } from '../../utils/formatadores';
import MapaEstatico from './MapaEstatico';
import styles from './SecaoDadosSignatario.module.css';

interface Props {
  signatario: DadosSignatario;
}

export default function SecaoDadosSignatario({ signatario }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados do Signatário</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.label}>Nome completo</span>
          <span className={styles.value}>{signatario.nomeCompleto}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>CPF</span>
          <span className={`${styles.value} ${styles.mono}`}>{formatarCpf(signatario.cpf)}</span>
        </div>
        <div className={styles.twoCol}>
          <div className={styles.field}>
            <span className={styles.label}>Data da assinatura</span>
            <span className={styles.value}>{formatarData(signatario.dataAssinatura)}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>IP de origem</span>
            <span className={`${styles.value} ${styles.mono}`}>{signatario.enderecoIp}</span>
          </div>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Localização</span>
          <span className={styles.locationRow}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{fontSize: '16px', color: 'var(--md-primary)'}}>location_on</span>
            <span className={`${styles.value} ${styles.mono}`}>
              {formatarCoordenadas(signatario.coordenadas.lat, signatario.coordenadas.lng)}
            </span>
          </span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Endereço aproximado</span>
          <span className={styles.value}>{signatario.enderecoAproximado}</span>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <MapaEstatico
          lat={signatario.coordenadas.lat}
          lng={signatario.coordenadas.lng}
          endereco={signatario.enderecoAproximado}
        />
      </div>
    </section>
  );
}
