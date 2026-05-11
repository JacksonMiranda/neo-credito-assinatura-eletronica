import type { StatusAssinatura } from '../../types/proposta';
import { LABEL_STATUS } from '../../utils/formatadores';
import styles from './SeloStatus.module.css';

interface Props {
  status: StatusAssinatura;
}

export default function SeloStatus({ status }: Props) {
  return (
    <span className={`${styles.badge} ${styles[status.toLowerCase() as Lowercase<StatusAssinatura>]}`}>
      {status === 'ASSINADO' && (
        <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
          check_circle
        </span>
      )}
      {LABEL_STATUS[status]}
    </span>
  );
}
