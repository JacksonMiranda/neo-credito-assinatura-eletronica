import styles from './EstadoVazio.module.css';

interface Props {
  mensagem: string;
  detalhe?: string;
}

export default function EstadoVazio({ mensagem, detalhe }: Props) {
  return (
    <div className={styles.container} role="status">
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <p className={styles.mensagem}>{mensagem}</p>
      {detalhe && <p className={styles.detalhe}>{detalhe}</p>}
    </div>
  );
}
