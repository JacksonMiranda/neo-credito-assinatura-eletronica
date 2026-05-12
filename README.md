# Neo Crédito - Assinatura Eletrônica

Sistema de acompanhamento e validação de assinaturas eletrônicas, desenvolvido como teste técnico de Front-end para a Neo Crédito.

O projeto cobre duas funcionalidades:
- **Painel CORBAN**: acompanhamento de propostas em processo de assinatura eletrônica, com filtros por status, busca por nome ou número e visualização de detalhes em painel lateral.
- **Validação do Dossiê**: revisão dos dados do assinante, imagens biométricas e registro de decisão do operador (aprovação ou reprovação com motivo).

---

## Tecnologias

| Camada | Escolha |
|---|---|
| Framework | React 19 + Vite |
| Linguagem | TypeScript |
| Roteamento | React Router DOM |
| Estilização | CSS Modules + CSS custom properties |
| Testes | Vitest + @testing-library/react + @testing-library/jest-dom |

Nenhuma biblioteca de UI (MUI, Chakra, Ant Design etc.) foi utilizada.

---

## Como instalar

```bash
git clone https://github.com/JacksonMiranda/neo-credito-assinatura-eletronica.git
cd neo-credito-assinatura-eletronica
npm install
```

Requer Node.js >= 20.19.

---

## Como rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

- `/` → Painel CORBAN
- `/dossie/:propostaId` → Validação do Dossiê (acessado via botão "Validar dossiê" em proposta com status **Assinado**)

---

## Como rodar os testes

```bash
npm test
```

Para rodar em modo watch:

```bash
npm run test:watch
```

---

## Decisões técnicas

### Por que Vite + React em vez de Next.js?

O desafio tem duas telas com dados em memória. Não há SSR, rotas de API nem necessidade de SEO. Vite é mais leve e suficiente para o escopo.

### Por que CSS Modules?

Mantém o escopo visual por componente sem adicionar dependências. CSS custom properties em `tokens.css` centralizam cores, espaçamentos e tipografia sem transformar o projeto em um design system.

### Organização por user story

Cada user story tem uma rota própria (`/` e `/dossie/:propostaId`). A navegação para a validação do dossiê ocorre exclusivamente a partir do **Painel CORBAN**: o operador seleciona uma proposta com status **Assinado** no painel lateral e clica em **Validar dossiê**, que navega para `/dossie/:numeroProposta`. O sidebar contém apenas o item **Painel CORBAN**, pois o dossiê só existe após a assinatura do contrato. O estado de cada tela é local, usando `useState` sem necessidade de estado global.

### Por que Vitest e não Jest puro?

O Vitest integra nativamente com o Vite sem configuração extra de transpilação. A API é idêntica à do Jest (`describe`, `it`, `expect`), então a migração é transparente.

### Filtro e busca

Estado mantido em `PainelCorban` com `useMemo` para o filtro combinado. A busca é case-insensitive e considera nome ou número da proposta.

---

## Premissas

- Dados mockados em memória; sem integração com API real.
- O dossiê é aberto diretamente a partir de uma proposta com status **Assinado** via botão "Validar dossiê" no painel lateral. A navegação usa o número da proposta como parâmetro de rota (`/dossie/:numeroProposta`), garantindo que o dossiê exibido corresponda sempre à proposta selecionada. Três dossiês estão disponíveis: `NEO-2026-0001` (Adriana Ferreira Lima), `NEO-2026-0006` (Fábio Augusto Teixeira) e `NEO-2026-0010` (João Paulo Vieira). Se a rota for acessada com um número sem dossiê cadastrado, a tela exibe uma mensagem de ausência e um link para voltar ao painel.
- O mapa de localização é ilustrativo. Em produção, usaria a API do Google Maps ou similar.
- As imagens de selfie, documento e mapa são assets locais, usados apenas para representar o dossiê.

---

## O que eu faria com mais tempo

- **Integração com API real**: substituir os mocks por chamadas a endpoints, com tratamento de loading, erro e paginação.
- **Testes adicionais**: cobrir cenários de borda, como falhas de rede e comportamentos em telas pequenas.
- **Mapa dinâmico**: usar Google Maps ou Mapbox com marcador posicionado pelas coordenadas reais do dossiê.
- **Foco gerenciado em modais**: garantir que o foco vá para o primeiro elemento interativo ao abrir dialog/drawer, e retorne ao elemento de origem ao fechar.
- **Persistência de filtros**: salvar os filtros ativos do painel em `sessionStorage` para não perder o contexto ao navegar para o dossiê e voltar.
---

## Validação local

Antes da entrega, os três comandos abaixo foram executados sem erros ou avisos:

```bash
npm run lint   # ESLint: 0 problems
npm test       # 17 testes — todos passaram
npm run build  # Vite: built com sucesso
```