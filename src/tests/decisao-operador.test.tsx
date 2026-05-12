import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ValidacaoDossie from '../routes/ValidacaoDossie';

function renderDossie(numeroProposta = 'NEO-2026-0001') {
  return render(
    <MemoryRouter initialEntries={[`/dossie/${numeroProposta}`]}>
      <Routes>
        <Route path="/dossie/:propostaId" element={<ValidacaoDossie />} />
        <Route path="/" element={<div>Painel CORBAN</div>} />
      </Routes>
    </MemoryRouter>
  );
}

// Após a decisão, o status aparece tanto na tag da página quanto no feedback da seção.
// Usamos getAllByText para evitar erro de "múltiplos elementos encontrados".

describe('ValidacaoDossie — decisão do operador', () => {
  it('exibe os dois botões de decisão no estado inicial', () => {
    renderDossie();
    expect(screen.getByRole('button', { name: /aprovado/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reprovado/i })).toBeInTheDocument();
  });

  it('aprovar: abre diálogo de confirmação e muda status para Aguardando Auditoria', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /aprovado/i }));

    expect(screen.getByRole('dialog', { name: /confirmar aprovação/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /confirmar aprovação/i }));

    expect(screen.getAllByText(/aguardando auditoria/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /aprovado — dentro da política/i })).not.toBeInTheDocument();
  });

  it('reprovar: botão de confirmar fica desabilitado sem motivo suficiente', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /reprovado/i }));

    const confirmBtn = screen.getByRole('button', { name: /confirmar reprovação/i });
    expect(confirmBtn).toBeDisabled();

    const textarea = screen.getByRole('textbox', { name: /motivo da reprovação/i });
    await user.type(textarea, 'Curto');
    expect(confirmBtn).toBeDisabled();

    await user.clear(textarea);
    await user.type(textarea, 'Documento ilegível para validação');
    expect(confirmBtn).not.toBeDisabled();
  });

  it('reprovar: confirmar com motivo válido muda status para Pendente de Regularização', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /reprovado/i }));

    const textarea = screen.getByRole('textbox', { name: /motivo da reprovação/i });
    await user.type(textarea, 'Selfie diverge do documento apresentado.');

    await user.click(screen.getByRole('button', { name: /confirmar reprovação/i }));

    expect(screen.getAllByText(/pendente de regularização/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/selfie diverge do documento/i)).toBeInTheDocument();
  });
});

describe('ValidacaoDossie — roteamento por número de proposta', () => {
  it('NEO-2026-0010 carrega João Paulo Vieira, não outro cliente', () => {
    renderDossie('NEO-2026-0010');
    expect(screen.getAllByText('João Paulo Vieira').length).toBeGreaterThan(0);
    expect(screen.queryByText('Adriana Ferreira Lima')).not.toBeInTheDocument();
    expect(screen.queryByText('Fábio Augusto Teixeira')).not.toBeInTheDocument();
    expect(screen.queryByText('Camila Rodrigues Neves')).not.toBeInTheDocument();
  });

  it('NEO-2026-0006 carrega Fábio Augusto Teixeira, não outro cliente', () => {
    renderDossie('NEO-2026-0006');
    expect(screen.getAllByText('Fábio Augusto Teixeira').length).toBeGreaterThan(0);
    expect(screen.queryByText('Adriana Ferreira Lima')).not.toBeInTheDocument();
    expect(screen.queryByText('João Paulo Vieira')).not.toBeInTheDocument();
  });

  it('proposta inexistente exibe "Dossiê não encontrado" e botão de voltar, sem carregar outro dossiê', () => {
    renderDossie('NEO-2026-9999');
    expect(screen.getByText(/dossiê não encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/NEO-2026-9999/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voltar para o painel corban/i })).toBeInTheDocument();
    expect(screen.queryByText('Adriana Ferreira Lima')).not.toBeInTheDocument();
    expect(screen.queryByText('João Paulo Vieira')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /aprovado/i })).not.toBeInTheDocument();
  });
});
