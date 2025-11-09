# ExportPlus Backend

Este é o backend do sistema ExportPlus, responsável pela API e regras de negócio.

## Principais Funcionalidades

- **Autenticação de Usuário:** Login, registro e autenticação via JWT.
- **Gerenciamento de Usuários:** CRUD completo (criar, listar, editar, excluir).
- **Formulário de Contato:** Recebimento e armazenamento de mensagens.
- **Validação e Segurança:** Middleware de autenticação, validação de dados e CORS.
- **Integração com Banco de Dados:** Persistência dos dados dos usuários e contatos.

## Estrutura de Pastas (Exemplo)

## Como Executar
1. Instale as dependências:
   ```bash
   npm install
 ```

2. Configure as variáveis de ambiente (exemplo: .env):
   ```bash
sua_ch_secreta
 ```

Inicie o servidor:
   ```bash
O backend estará disponível em http://localhost:3000/
   ```
Scripts Úteis
Rodar em modo desenvolvimento:
   ```bash
npm run start:dev
 ```

## Importante 
 - enviei os acessos do arquivo .env no email para acessar o banco de dados supabase , além disso add tbm sql para uso 
 - comando ao add arquivo .env: npx prisma migrate ou npx prisma migrate dev

### Database
 - acessar pasta : databse/createDB.sql

### Swagger
  - http://localhost:3000/api#/users

Rodar testes:
   ```bash
npm test

 ```

Requisitos
Node.js 18+
Supabase banco de dados 
O backend segue boas práticas de modularização e segurança.
Para integração completa, utilize o frontend do ExportPlus.