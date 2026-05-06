# MyTask Pro — Frontend

Interface web para o Task Manager API, construída com Next.js 14, TypeScript, Tailwind CSS e React Query.

---

## Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — estilização com tema escuro customizado
- **React Query (TanStack Query v5)** — cache e sincronização de dados
- **React Hook Form** + **Zod** — formulários com validação tipada
- **Axios** — cliente HTTP com interceptors para JWT
- **date-fns** — manipulação de datas para filtros
- **js-cookie** — persistência do token JWT

---

## Arquitetura

```
src/
├── app/                    # Next.js App Router (pages)
│   ├── page.tsx            # Landing page
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── dashboard/page.tsx  # Home autenticada
├── components/
│   ├── ui/                 # Componentes reutilizáveis (Input, Button, Modal, Select)
│   └── tasks/              # Componentes de tarefa (TaskCard, TaskForm, FilterBar, ProgressBar)
├── hooks/
│   ├── useAuth.ts          # Mutations e queries de autenticação
│   └── useTasks.ts         # CRUD de tarefas com filtros
├── services/
│   ├── authService.ts      # Chamadas à API de auth
│   └── taskService.ts      # Chamadas à API de tarefas
├── lib/
│   ├── api/client.ts       # Axios com interceptors JWT
│   ├── validations/        # Schemas Zod
│   └── utils.ts            # Helpers, cn(), formatDuration(), categorias
├── providers/
│   └── QueryProvider.tsx   # React Query client
└── types/index.ts          # Tipos globais TypeScript
```

---

## Como rodar

### Pré-requisitos

- Node.js 20+
- Backend rodando (veja o projeto `task-manager`)

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o .env

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### 3. Rode em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

---

## Telas

| Rota              | Descrição                                  | Auth |
|-------------------|--------------------------------------------|------|
| `/`               | Landing page com CTA                       | ✗    |
| `/auth/login`     | Login com e-mail e senha                   | ✗    |
| `/auth/register`  | Cadastro de novo usuário                   | ✗    |
| `/dashboard`      | Lista de tarefas com filtros e progresso   | ✓    |

---

## Funcionalidades

- ✅ Login e cadastro com validação Zod
- ✅ Token JWT salvo em cookie (1 dia)
- ✅ Redirect automático para login ao expirar token (interceptor Axios)
- ✅ Listagem de tarefas do usuário logado
- ✅ Criar tarefa (título, categoria, duração em minutos)
- ✅ Editar tarefa via modal
- ✅ Deletar tarefa
- ✅ Marcar/desmarcar como concluída
- ✅ Filtro por período: Hoje / Semana / Mês
- ✅ Filtro por categoria
- ✅ Barra de progresso (tarefas concluídas / total)
- ✅ Tempo estimado total e concluído
- ✅ Loading skeletons e estados vazios
- ✅ Animações de entrada nos cards
- ✅ Design responsivo mobile-first

---

## Princípios aplicados

| Princípio | Aplicação |
|-----------|-----------|
| **Single Responsibility** | Cada componente/hook faz uma única coisa |
| **Clean Architecture** | `services` → `hooks` → `components` → `pages` sem dependências invertidas |
| **Open/Closed** | Componentes UI aceitam extensão via props sem modificação |
| **Zod + RHF** | Validação isolada nos schemas, formulários desacoplados da lógica de negócio |
| **React Query** | Cache centralizado, sem prop drilling de estado async |
