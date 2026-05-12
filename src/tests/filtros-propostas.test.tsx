import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PainelCorban from '../routes/PainelCorban';
import BarraSuperior from '../components/layout/BarraSuperior';
import PainelDetalhesProposta from '../components/propostas/PainelDetalhesProposta';
import { propostas } from '../data/propostas.mock';

function renderPainel() {
  return render(
    <MemoryRouter>
      <PainelCorban />
    </MemoryRouter>
  );
}

// A tabela renderiza versão desktop (table) + mobile (cards),
// por isso cada texto aparece duas vezes no DOM. Usamos getAllByText/queryAllByText.

describe('PainelCorban — filtros e busca', () => {
  it('exibe todas as propostas por padrão', () => {
    renderPainel();
    expect(screen.getAllByText('Adriana Ferreira Lima').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bruno Carvalho Santos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('João Paulo Vieira').length).toBeGreaterThan(0);
  });

  it('filtra por status corretamente', async () => {
    const user = userEvent.setup();
    renderPainel();

    const select = screen.getByRole('combobox', { name: /filtrar por status/i });
    await user.selectOptions(select, 'ASSINADO');

    expect(screen.getAllByText('Adriana Ferreira Lima').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fábio Augusto Teixeira').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Bruno Carvalho Santos')).toHaveLength(0);
  });

  it('busca pelo nome do cliente (case-insensitive)', async () => {
    const user = userEvent.setup();
    renderPainel();

    const input = screen.getByRole('searchbox', { name: /buscar proposta/i });
    await user.type(input, 'carla');

    expect(screen.getAllByText('Carla Mendes Oliveira').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Adriana Ferreira Lima')).toHaveLength(0);
  });

  it('busca e filtro de status funcionam combinados', async () => {
    const user = userEvent.setup();
    renderPainel();

    const input = screen.getByRole('searchbox', { name: /buscar proposta/i });
    const select = screen.getByRole('combobox', { name: /filtrar por status/i });

    await user.type(input, 'NEO-2026');
    await user.selectOptions(select, 'AGUARDANDO');

    expect(screen.getAllByText('Bruno Carvalho Santos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Elaine Cristina Rocha').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Adriana Ferreira Lima')).toHaveLength(0);
  });

  it('exibe mensagem de estado vazio quando filtro não retorna resultados', async () => {
    const user = userEvent.setup();
    renderPainel();

    const input = screen.getByRole('searchbox', { name: /buscar proposta/i });
    await user.type(input, 'cliente que nao existe xyz');

    expect(screen.getByText(/nenhuma proposta encontrada/i)).toBeInTheDocument();
  });

  it('abre o painel lateral de detalhes ao clicar em uma proposta', async () => {
    const user = userEvent.setup();
    renderPainel();

    const rows = screen.getAllByText('Adriana Ferreira Lima');
    await user.click(rows[0]);

    expect(screen.getAllByText('NEO-2026-0001').length).toBeGreaterThan(0);
    expect(screen.getByText(/link de assinatura/i)).toBeInTheDocument();
  });
});

describe('BarraSuperior — navegação', () => {
  it('não exibe link de Validação do Dossiê no sidebar', () => {
    render(
      <MemoryRouter>
        <BarraSuperior />
      </MemoryRouter>
    );
    expect(screen.queryByText(/validação do dossiê/i)).not.toBeInTheDocument();
    expect(screen.getByText(/painel corban/i)).toBeInTheDocument();
  });
});

describe('PainelDetalhesProposta — acesso ao dossiê', () => {
  const propostaAssinada = propostas.find((p) => p.status === 'ASSINADO')!;
  const propostaAguardando = propostas.find((p) => p.status === 'AGUARDANDO')!;

  it('proposta ASSINADA exibe botão "Validar dossiê" e não exibe ações não solicitadas', () => {
    render(
      <MemoryRouter>
        <PainelDetalhesProposta proposta={propostaAssinada} onFechar={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /validar dossiê/i })).toBeInTheDocument();
    expect(screen.queryByText(/dossiê ficará disponível/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /reenviar link/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /baixar/i })).not.toBeInTheDocument();
  });

  it('proposta não assinada exibe mensagem informativa e não exibe botões operacionais', () => {
    render(
      <MemoryRouter>
        <PainelDetalhesProposta proposta={propostaAguardando} onFechar={() => {}} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button', { name: /validar dossiê/i })).not.toBeInTheDocument();
    expect(screen.getByText(/dossiê ficará disponível após a conclusão da assinatura/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /reenviar link/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /baixar/i })).not.toBeInTheDocument();
  });

  it('clique em "Validar dossiê" navega para /dossie/:numeroProposta', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<PainelDetalhesProposta proposta={propostaAssinada} onFechar={() => {}} />}
          />
          <Route path="/dossie/:propostaId" element={<div data-testid="tela-dossie">Dossiê</div>} />
        </Routes>
      </MemoryRouter>
    );
    await user.click(screen.getByRole('button', { name: /validar dossiê/i }));
    expect(screen.getByTestId('tela-dossie')).toBeInTheDocument();
  });
});
