import type { Dossie } from '../types/dossie';

export const dossie: Dossie = {
  id: 'd-001',
  numeroProposta: 'NEO-2026-0001',
  nomeCliente: 'Adriana Ferreira Lima',
  status: 'PENDENTE_VALIDACAO',
  signatario: {
    nomeCompleto: 'Adriana Ferreira Lima',
    cpf: '39812345600',
    dataAssinatura: '2026-05-07T14:32:00Z',
    enderecoIp: '187.45.123.88',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
    enderecoAproximado: 'Av. Paulista, 1578 — Bela Vista, São Paulo / SP',
  },
  evidenciasBiometricas: {
    urlSelfie: '/ativos-prototipo/selfie.png',
    urlDocumento: '/ativos-prototipo/foto-documento.png',
    pontuacaoSimilaridade: 97.3,
  },
};
