import { useState, useMemo } from 'react';
import type { Proposta, StatusAssinatura } from '../types/proposta';
import { propostas as todasPropostas } from '../data/propostas.mock';
import FiltrosPropostas from '../components/propostas/FiltrosPropostas';
import TabelaPropostas from '../components/propostas/TabelaPropostas';
import PainelDetalhesProposta from '../components/propostas/PainelDetalhesProposta';
import styles from './PainelCorban.module.css';

export default function PainelCorban() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusAssinatura | ''>('');
  const [propostaSelecionada, setPropostaSelecionada] = useState<Proposta | null>(null);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return todasPropostas.filter((p) => {
      const matchStatus = filtroStatus === '' || p.status === filtroStatus;
      const matchBusca =
        termo === '' ||
        p.nomeCliente.toLowerCase().includes(termo) ||
        p.numero.toLowerCase().includes(termo);
      return matchStatus && matchBusca;
    });
  }, [busca, filtroStatus]);

  function selecionarProposta(proposta: Proposta) {
    setPropostaSelecionada((prev) =>
      prev?.id === proposta.id ? null : proposta
    );
  }

  function fecharPainel() {
    setPropostaSelecionada(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Painel de Acompanhamento</h1>
        <p className={styles.subtitle}>
          Acompanhamento de propostas em processo de assinatura eletrônica.
        </p>
      </div>

      <div className={styles.toolbar}>
        <FiltrosPropostas
          busca={busca}
          filtroStatus={filtroStatus}
          onBuscaChange={setBusca}
          onFiltroStatusChange={setFiltroStatus}
        />
        <span className={styles.count}>
          {filtradas.length} {filtradas.length === 1 ? 'proposta' : 'propostas'}
        </span>
      </div>

      <TabelaPropostas
        propostas={filtradas}
        idSelecionado={propostaSelecionada?.id ?? null}
        onSelecionar={selecionarProposta}
      />

      <PainelDetalhesProposta
        proposta={propostaSelecionada}
        onFechar={fecharPainel}
      />
    </div>
  );
}
