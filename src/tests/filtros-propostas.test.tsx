import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PainelCorban from '../routes/PainelCorban';

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
