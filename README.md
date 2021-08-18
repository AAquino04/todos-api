<h1 align="center">Todos-API</h1>

## Projeto
Este projeto é uma API desenvolvida para gerenciar tarefas ou afazeres.</p>

## Tecnologias
O projeto foi desenvolvido usando as seguintes tecnologias:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)

## Execução

- Clone o repositório
- Execute o comando `yarn` para baixar as dependências do projeto
- Execute o comando `yarn dev` para iniciar a aplicação
  
A aplicação estará disponível em `http://localhost:3333`

### Requisitos

- [x] Deve ser possível criar um usuário com **name** e **username**;
- [x] Deve ser possível criar um *todo*;
- [x] Deve ser possível listar todos os *todos*;
- [x] Deve ser possível alterar o **title** e **deadline** de um *todo* existente;
- [x] Deve ser possível sinalizar um *todo* como concluído;
- [x] Deve ser possível excluir um *todo*.

### Regras de negócio

- [x] Não deve ser possível cadastrar um usuário com **username** já existente;
- [x] Não deve ser possível alterar o **title** e **deadline** de um *todo* inexistente;
- [x] Não deve ser possível sinalizar um *todo* inexistente como concluído;
- [x] Não deve ser possível excluir um *todo* inexistente.
