import type { StatusAssinatura } from '../types/proposta';

export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function formatarDataSemHora(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso));
}

export function formatarCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatarCoordenadas(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

export const LABEL_STATUS: Record<StatusAssinatura, string> = {
  AGUARDANDO: 'Aguardando assinatura',
  ASSINADO: 'Assinado',
  RECUSADO: 'Recusado',
  EXPIRADO: 'Expirado',
};

export const LABEL_CANAL: Record<string, string> = {
  email: 'E-mail',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
};

export const LABEL_RESULTADO_CONTATO: Record<string, string> = {
  enviado: 'Enviado',
  visualizado: 'Visualizado',
  sem_resposta: 'Sem resposta',
  erro: 'Falha no envio',
};

export const LABEL_STATUS_DOSSIE: Record<string, string> = {
  PENDENTE_VALIDACAO: 'Pendente de validação',
  AGUARDANDO_AUDITORIA: 'Aguardando auditoria',
  REPROVADO: 'Reprovado',
  PENDENTE_REGULARIZACAO: 'Pendente de regularização',
};
