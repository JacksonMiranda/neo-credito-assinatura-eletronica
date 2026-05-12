import type { Dossie } from '../types/dossie';

export const dossies: Dossie[] = [
  {
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
      urlSelfie: '/ativos-prototipo/selfie-adriana.png',
      urlDocumento: '/ativos-prototipo/foto-documento-adriana.png',
      urlMapa: '/ativos-prototipo/mapa-adriana.png',
      pontuacaoSimilaridade: 97.3,
    },
  },
  {
    id: 'd-006',
    numeroProposta: 'NEO-2026-0006',
    nomeCliente: 'Fábio Augusto Teixeira',
    status: 'PENDENTE_VALIDACAO',
    signatario: {
      nomeCompleto: 'Fábio Augusto Teixeira',
      cpf: '52134987611',
      dataAssinatura: '2026-05-08T09:15:00Z',
      enderecoIp: '201.18.44.102',
      coordenadas: { lat: -22.9068, lng: -43.1729 },
      enderecoAproximado: 'Rua Voluntários da Pátria, 220 — Botafogo, Rio de Janeiro / RJ',
    },
    evidenciasBiometricas: {
      urlSelfie: '/ativos-prototipo/selfie-fabio.png',
      urlDocumento: '/ativos-prototipo/foto-documento-fabio.png',
      urlMapa: '/ativos-prototipo/mapa-fabio.png',
      pontuacaoSimilaridade: 91.7,
    },
  },
  {
    id: 'd-010',
    numeroProposta: 'NEO-2026-0010',
    nomeCliente: 'João Paulo Vieira',
    status: 'PENDENTE_VALIDACAO',
    signatario: {
      nomeCompleto: 'João Paulo Vieira',
      cpf: '18374256900',
      dataAssinatura: '2026-05-08T07:30:00Z',
      enderecoIp: '189.60.77.200',
      coordenadas: { lat: -19.9191, lng: -43.9378 },
      enderecoAproximado: 'Av. Aflânio Peixoto, 540 — Gameleira, Belo Horizonte / MG',
    },
    evidenciasBiometricas: {
      urlSelfie: '/ativos-prototipo/selfie-joao.png',
      urlDocumento: '/ativos-prototipo/foto-documento-joao.png',
      urlMapa: '/ativos-prototipo/mapa-joao.png',
      pontuacaoSimilaridade: 88.4,
    },
  },
];

// Alias explícito para uso externo.
export const dossiesMock = dossies;

export function obterDossiePorNumero(numeroProposta: string): Dossie | undefined {
  return dossiesMock.find((d) => d.numeroProposta === numeroProposta);
}

