import type { StatusAssinatura } from '../../types/proposta';
import { LABEL_STATUS } from '../../utils/formatadores';
import styles from './FiltrosPropostas.module.css';

interface Props {
  busca: string;
  filtroStatus: StatusAssinatura | '';
  onBuscaChange: (valor: string) => void;
  onFiltroStatusChange: (valor: StatusAssinatura | '') => void;
}

export default function FiltrosPropostas({
  busca,
  filtroStatus,
  onBuscaChange,
  onFiltroStatusChange,
}: Props) {
  return (
    <div className={styles.filters} role="search">
      <div className={styles.searchWrapper}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`} aria-hidden="true">
          search
        </span>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar por nome ou número da proposta…"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          aria-label="Buscar proposta"
        />
      </div>
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={filtroStatus}
          onChange={(e) => onFiltroStatusChange(e.target.value as StatusAssinatura | '')}
          aria-label="Filtrar por status"
        >
          <option value="">Todos os status</option>
          {(Object.keys(LABEL_STATUS) as StatusAssinatura[]).map((s) => (
            <option key={s} value={s}>
              {LABEL_STATUS[s]}
            </option>
          ))}
        </select>
        <span className={`material-symbols-outlined ${styles.selectIcon}`} aria-hidden="true">
          expand_more
        </span>
      </div>
    </div>
  );
}
