export type StatusDossie =
  | 'PENDENTE_VALIDACAO'
  | 'AGUARDANDO_AUDITORIA'
  | 'REPROVADO';

export interface DadosSignatario {
  nomeCompleto: string;
  cpf: string;
  dataAssinatura: string; // ISO 8601
  enderecoIp: string;
  coordenadas: { lat: number; lng: number };
  enderecoAproximado: string;
}

export interface EvidenciaBiometrica {
  urlSelfie: string;
  urlDocumento: string;
  pontuacaoSimilaridade: number; // 0–100
}

export interface DecisaoValidacao {
  resultado: 'APROVADO' | 'REPROVADO';
  motivo?: string;
  dataDecisao: string; // ISO 8601
}

export interface Dossie {
  id: string;
  numeroProposta: string;
  nomeCliente: string;
  status: StatusDossie;
  signatario: DadosSignatario;
  evidenciasBiometricas: EvidenciaBiometrica;
  decisao?: DecisaoValidacao;
}
