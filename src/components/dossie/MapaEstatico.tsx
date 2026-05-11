import styles from './MapaEstatico.module.css';

interface Props {
  lat: number;
  lng: number;
  endereco: string;
}

export default function MapaEstatico({ lat, lng, endereco }: Props) {
  return (
    <div className={styles.container} role="img" aria-label={`Mapa aproximado: ${endereco}`}>
      <img
        className={styles.mapImage}
        src="/ativos-prototipo/mapa.png"
        alt=""
        aria-hidden="true"
      />

      <div className={styles.overlay}>
        <span className={styles.coords}>
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
        <span className={styles.note}>Mapa ilustrativo</span>
      </div>
    </div>
  );
}
