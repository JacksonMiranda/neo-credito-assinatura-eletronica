export type StatusAssinatura = 'AGUARDANDO' | 'ASSINADO' | 'RECUSADO' | 'EXPIRADO';

export interface TentativaContato {
  id: string;
  dataHora: string; // ISO 8601
  canal: 'email' | 'sms' | 'whatsapp';
  resultado: 'enviado' | 'visualizado' | 'sem_resposta' | 'erro';
}

export interface Proposta {
  id: string;
  numero: string;
  nomeCliente: string;
  status: StatusAssinatura;
  dataUltimoEvento: string; // ISO 8601
  link: string;
  dataEnvio: string; // ISO 8601
  logTentativasContato: TentativaContato[];
}
