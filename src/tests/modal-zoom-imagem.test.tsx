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
      </Routes>
    </MemoryRouter>
  );
}

describe('ModalZoomImagem — zoom de evidências biométricas', () => {
  it('abre modal ao clicar na selfie', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));

    expect(screen.getByRole('dialog', { name: /visualização ampliada.*selfie/i })).toBeInTheDocument();
  });

  it('abre modal ao clicar no documento', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar documento/i }));

    expect(screen.getByRole('dialog', { name: /visualização ampliada.*documento/i })).toBeInTheDocument();
  });

  it('exibe botão de aumentar zoom funcional', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));

    const btnZoomIn = screen.getByRole('button', { name: /aumentar zoom/i });
    expect(btnZoomIn).toBeInTheDocument();
    expect(btnZoomIn).not.toBeDisabled();

    // Verifica estado inicial de 100%
    expect(screen.getByText('100%')).toBeInTheDocument();

    await user.click(btnZoomIn);
    expect(screen.getByText('125%')).toBeInTheDocument();
  });

  it('exibe botão de diminuir zoom funcional', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));

    const btnZoomOut = screen.getByRole('button', { name: /diminuir zoom/i });
    expect(btnZoomOut).toBeInTheDocument();

    await user.click(btnZoomOut);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('exibe botão de resetar zoom que volta a 100%', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));

    // Aumenta zoom duas vezes
    const btnZoomIn = screen.getByRole('button', { name: /aumentar zoom/i });
    await user.click(btnZoomIn);
    await user.click(btnZoomIn);
    expect(screen.getByText('150%')).toBeInTheDocument();

    // Reseta
    await user.click(screen.getByRole('button', { name: /resetar zoom/i }));
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('fecha modal ao clicar no botão de fechar', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /fechar visualização/i }));
    expect(screen.queryByRole('dialog', { name: /visualização ampliada/i })).not.toBeInTheDocument();
  });

  it('fecha modal ao pressionar ESC', async () => {
    const user = userEvent.setup();
    renderDossie();

    await user.click(screen.getByRole('button', { name: /ampliar selfie/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /visualização ampliada/i })).not.toBeInTheDocument();
  });
});
