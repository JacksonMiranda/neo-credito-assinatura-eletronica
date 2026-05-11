import { useState } from 'react';
import type { Proposta } from '../../types/proposta';
import { formatarData } from '../../utils/formatadores';
import SeloStatus from './SeloStatus';
import EstadoVazio from '../ui/EstadoVazio';
import styles from './TabelaPropostas.module.css';

const PAGE_SIZE = 10;

interface Props {
  propostas: Proposta[];
  idSelecionado: string | null;
  onSelecionar: (proposta: Proposta) => void;
}

export default function TabelaPropostas({ propostas, idSelecionado, onSelecionar }: Props) {
  const [pagina, setPagina] = useState(0);

  if (propostas.length === 0) {
    return (
      <EstadoVazio
        mensagem="Nenhuma proposta encontrada."
        detalhe="Tente ajustar os filtros ou o termo de busca."
      />
    );
  }

  const totalPaginas = Math.ceil(propostas.length / PAGE_SIZE);
  const paginadas = propostas.slice(pagina * PAGE_SIZE, (pagina + 1) * PAGE_SIZE);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} aria-label="Lista de propostas">
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Último evento</th>
            <th className={styles.actionsCol}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginadas.map((p) => (
            <tr
              key={p.id}
              className={`${styles.row} ${idSelecionado === p.id ? styles.rowSelected : ''}`}
              onClick={() => onSelecionar(p)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelecionar(p)}
              aria-selected={idSelecionado === p.id}
              role="row"
            >
              <td className={styles.number}>{p.numero}</td>
              <td className={styles.clientName}>{p.nomeCliente}</td>
              <td>
                <SeloStatus status={p.status} />
              </td>
              <td className={styles.date}>{formatarData(p.dataUltimoEvento)}</td>
              <td className={styles.actionsCell}>
                <button
                  className={styles.actionBtn}
                  aria-label={`Ações para ${p.numero}`}
                  onClick={(e) => { e.stopPropagation(); onSelecionar(p); }}
                  type="button"
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPaginas > 1 && (
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            {pagina * PAGE_SIZE + 1}–{Math.min((pagina + 1) * PAGE_SIZE, propostas.length)} de {propostas.length}
          </span>
          <div className={styles.paginationControls}>
            <button
              className={styles.pageBtn}
              onClick={() => setPagina((p) => Math.max(0, p - 1))}
              disabled={pagina === 0}
              aria-label="Página anterior"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className={styles.pageBtn}
              onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
              disabled={pagina === totalPaginas - 1}
              aria-label="Próxima página"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
