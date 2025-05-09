# SalaBase - Uma Base Central de Salas

Esta aplicação Web funciona como um sistema de agendamento de salas especializado no formato de reserva do Inteli, focado em facilitar as reservas por parte dos alunos.

## Requisitos Obrigatórios

- Node.js (versão 22.13.X)
- PostgreSQL (versão 17.4.X)

## Começando a Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/AmandaMartinez-R/SalaBase_Project.git
   cd SalaBase_Project
```

2. **Instalar as dependências:**

```bash
npm install
```

3. **Configurar o arquivo `.env`:**

Altere o nome do arquivo .env.example para .env e defina nele as variáveis de ambiente essenciais, incluindo as credenciais de acesso ao banco de dados PostgreSQL.

## Configuração do Banco de Dados

1. **Criação do banco de dados:**

   Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.

2. **Executar o script SQL de inicialização:**

```bash
npm run init-db
```

Isso criará todas as tabelas do projeto no seu banco de dados PostgreSQL com UUID como chave primária.

## Funcionalidades

SalaHub é uma aplicação web desenvolvida para facilitar o agendamento e gerenciamento de reservas de salas pelos alunos do Inteli. A plataforma permite que os usuários visualizem a disponibilidade dos espaços, filtrem por data e horário e realizem reservas de forma rápida e intuitiva. Com uma interface simples e funcional, o sistema busca otimizar a utilização dos ambientes da instituição, promovendo organização, autonomia e melhor aproveitamento dos recursos físicos oferecidos pela faculdade.

## Scripts Disponíveis

- `npm start`: Inicia o servidor Node.js.
- `npm run dev`: Inicia o servidor com reinicialização automática após alterações no código.
- `npm run init-db`: Inicia as tabelas necessárias para o banco de dados.

## Estrutura de Diretórios

- **`assets/`**: Arquivos públicos como imagens e fontes do projeto
- **`config/`**: Arquivos de configuração (ex: conexão com banco)
- **`controllers/`**: Lógica de controle das requisições
- **`models/`**: Definição de modelos de dados (estrutura do banco)
- **`routes/`**: Definição das rotas do sistema
- **`scripts/`**: Arquivos de JavaScript públicos
- **`services/`**: Serviços auxiliares do sistema
- **`tests/`**: Arquivos de testes unitários.
- **.gitignore**: Arquivo para ignorar arquivos no Git
- **.env.example**: Arquivo de exemplo para variáveis de ambiente
- **jest.config.js**: Arquivo de configuração do Jest
- **package-lock.json**: Gerenciador de dependências do Node.js
- **package.json**: Gerenciador de dependências do Node.js
- **readme.md**: Documentação do projeto (Markdown)
- **server.js**: Arquivo principal que inicializa o servidor

## Contribuição

Livre para sugestões e colaborações.

## Licença

Este projeto está licenciado sob a Licença INTELI.