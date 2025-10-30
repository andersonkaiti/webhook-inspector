<div align="center">

# 🕵️‍♂️ Webhook Inspector

**Uma ferramenta poderosa para capturar, inspecionar e debugar requisições de webhook em tempo real**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.0-000000?style=flat&logo=fastify)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-2D3748?style=flat&logo=prisma)](https://orm.drizzle.team/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat&logo=docker)](https://www.docker.com/)

[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/badge/Issues-Open-red.svg)](https://github.com/andersonkaiti/webhook-inspector/issues)

</div>

## 📋 Índice
- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠 Tecnologias](#-tecnologias)
- [🏗 Arquitetura](#-arquitetura)
- [🚀 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [🎮 Uso](#-uso)
- [📚 Documentação da API](#-documentação-da-api)
- [📊 Banco de Dados](#-banco-de-dados)

## 🎯 Sobre o Projeto

O **Webhook Inspector** é uma ferramenta poderosa projetada para ajudar desenvolvedores a testar, depurar e monitorar webhooks em tempo real. Com uma interface intuitiva e recursos avançados, você pode facilmente capturar, inspecionar e gerenciar todas as requisições webhook em um único lugar.

## ✨ Funcionalidades

- **Captura em Tempo Real**: Visualize as requisições webhook assim que elas chegam
- **Interface Amigável**: Painel intuitivo para monitorar e filtrar requisições
- **Detalhes Completos**: Acesse todos os detalhes da requisição, incluindo cabeçalhos, corpo e parâmetros
- **Pesquisa Avançada**: Filtre requisições por método, status, conteúdo e muito mais
- **Documentação Automática**: Documentação da API gerada automaticamente com Swagger e Scalar
- **Pronto para Produção**: Fácil implantação com Docker e configuração simplificada

## 🛠 Tecnologias

### 🚀 Backend

| Categoria       | Tecnologias                                                                 |
|----------------|----------------------------------------------------------------------------|
| **Runtime**    | ![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)    |
| **Linguagem**  | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript) |
| **Framework**  | ![Fastify](https://img.shields.io/badge/Fastify-4.0-000000?logo=fastify)   |
| **Banco de Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql) |
| **ORM**        | ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.29.1-2D3748)     |
| **Validação**  | ![Zod](https://img.shields.io/badge/Zod-3.22.0-1A365D)                     |
| **Documentação** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger) + ![Scalar](https://img.shields.io/badge/Scalar_API-1.0-1890FF) |

### 🛠 Ferramentas e Utilitários

| Categoria           | Ferramentas                                                                 |
|---------------------|----------------------------------------------------------------------------|
| **Gerenciador de Pacotes** | ![pnpm](https://img.shields.io/badge/pnpm-8.6.0-F69220?logo=pnpm)         |
| **Containerização** | ![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?logo=docker) + ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2.0-2496ED?logo=docker) |
| **Formatação**      | ![Biome](https://img.shields.io/badge/Biome-1.5.0-000000?logo=biome)       |
| **Controle de Versão** | ![Git](https://img.shields.io/badge/Git-2.42-F05032?logo=git)            |

## 🏗 Arquitetura

### Visão Geral
```mermaid
graph TD
    A[Cliente] -->|Envia Webhook| B[API Webhook Inspector]
    B -->|Armazena| C[(PostgreSQL)]
    B -->|Responde| A
    D[Painel Web] -->|Consulta| B
    B -->|Fornece Dados| D
```

### 🔄 Fluxo de Dados
```mermaid
sequenceDiagram
    participant C as Cliente
    participant W as Webhook Inspector
    participant D as Banco de Dados
    
    C->>W: Envia requisição webhook
    W->>D: Armazena requisição
    D-->>W: Confirmação
    W-->>C: Resposta HTTP
    
    loop Monitoramento
        W->>D: Consulta requisições
        D-->>W: Retorna dados
    end
```

## 💾 Banco de Dados

### Schema do Banco
```mermaid
erDiagram
    WEBHOOKS {
        string id PK
        string method
        string pathname
        string ip
        integer statusCode
        string contentType
        integer contentLength
        jsonb queryParams
        jsonb headers
        text body
        timestamp createdAt
    }
```

## 🚀 Instalação

### 📋 Pré-requisitos
- Node.js 20+ (recomendado LTS)
- pnpm 8+
- Docker e Docker Compose
- Git

### 🔧 Instalação Passo a Passo
1. **Clone o repositório**
   ```bash
   git clone https://github.com/andersonkaiti/webhook-inspector.git
   cd webhook-inspector
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cd api
   cp .env.example .env
   ```

4. **Inicie o banco de dados**
   ```bash
   cd api
   docker-compose up -d
   ```

5. **Execute as migrações**
   ```bash
   pnpm db:migrate
   ```

## ⚙️ Configuração

### 🔐 Variáveis de Ambiente
Edite o arquivo `.env` na pasta `api` com as seguintes configurações:

```env
# Aplicação
NODE_ENV=development
PORT=3333

# Banco de Dados
DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks

# Segurança (gerar com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
# APP_SECRET=

# Logs
LOG_LEVEL=info
```

## 🎮 Uso

### 🚀 Desenvolvimento
1. **Inicie o servidor de desenvolvimento**
   ```bash
   cd api
   pnpm dev
   ```

2. **Acesse as ferramentas**
   - **API**: http://localhost:3333
   - **Documentação**: http://localhost:3333/docs
   - **Drizzle Studio**: http://localhost:8080 (após executar `pnpm db:studio`)

### 🏭 Produção
1. **Compile o projeto**
   ```bash
   cd api
   pnpm build
   ```

2. **Inicie o servidor**
   ```bash
   pnpm start
   ```

## 📚 Documentação da API
A API do Webhook Inspector possui documentação interativa completa disponível em [http://localhost:3333/docs](http://localhost:3333/docs) quando o servidor estiver em execução.

### 📖 Visão Geral da Documentação
A documentação interativa inclui:
- Lista completa de todos os endpoints disponíveis
- Esquemas de requisição e resposta
- Exemplos de uso para cada endpoint
- Teste direto dos endpoints através da interface do navegador
- Descrições detalhadas de parâmetros e códigos de status

### 🔍 Acessando a Documentação
1. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
2. Acesse [http://localhost:3333/docs](http://localhost:3333/docs) no seu navegador

