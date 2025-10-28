# Webhook Inspector

Uma aplicação para capturar e inspecionar requisições de webhook em tempo real.

## 🚀 Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Backend** | Node.js + TypeScript |
| **Framework** | Fastify |
| **Banco de Dados** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Validação** | Zod |
| **Documentação** | Swagger + Scalar API Reference |
| **Gerenciador de Pacotes** | pnpm |
| **Containerização** | Docker |

## 📋 Pré-requisitos

- Node.js 18+
- pnpm
- Docker e Docker Compose

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd webhook-inspector
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cd api
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks
```

4. Inicie o banco de dados:
```bash
cd api
docker-compose up -d
```

5. Execute as migrações do banco:
```bash
pnpm db:migrate
```

## 🏃‍♂️ Uso

### Desenvolvimento

1. Inicie o servidor em modo de desenvolvimento:
```bash
cd api
pnpm dev
```

2. Acesse a aplicação:
- **API**: http://localhost:3333
- **Documentação**: http://localhost:3333/docs

### Produção

1. Compile o projeto:
```bash
cd api
pnpm build
```

2. Inicie o servidor:
```bash
pnpm start
```

## 📚 API Endpoints

### GET /api/webhooks
Lista os webhooks capturados.

**Parâmetros de Query:**
- `limit` (opcional): Número de resultados (padrão: 20, máximo: 100)

**Resposta:**
```json
[
  {
    "id": "string",
    "method": "string"
  }
]
```

## 🗄️ Banco de Dados

### Comandos úteis:

- **Gerar migrações**: `pnpm db:generate`
- **Executar migrações**: `pnpm db:migrate`
- **Abrir Drizzle Studio**: `pnpm db:studio`

### Schema

A tabela `webhooks` armazena:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | text | Identificador único (UUID v7) |
| `method` | text | Método HTTP |
| `pathname` | text | Caminho da requisição |
| `ip` | text | Endereço IP |
| `statusCode` | integer | Código de status HTTP |
| `contentType` | text | Tipo de conteúdo |
| `contentLength` | integer | Tamanho do conteúdo |
| `queryParams` | jsonb | Parâmetros de query (JSON) |
| `headers` | jsonb | Cabeçalhos HTTP (JSON) |
| `body` | text | Corpo da requisição |
| `createdAt` | timestamp | Data de criação |

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor em modo de desenvolvimento |
| `pnpm start` | Inicia o servidor em produção |
| `pnpm format` | Formata o código usando Biome |
| `pnpm db:generate` | Gera migrações do banco de dados |
| `pnpm db:migrate` | Executa migrações do banco de dados |
| `pnpm db:studio` | Abre o Drizzle Studio |
