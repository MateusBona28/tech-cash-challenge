# tech-cash-challenge

## Algumas instruções:

### clonando repositórios e acessando funcionalidades.
- Para rodar o servidor e banco de dados localmente com Docker, simplesmente use o comando docker-compose up no terminal;
- O frontEnd para validação das rotas pode ser acessado em produção no Vercel, segue o link: https://tech-cash-challenge.vercel.app/
- Ou também pode ser clonado a partir desse link do github: https://github.com/MateusBona28/tech-challenge-app/tree/main
- O frontEnd em produção está conectado diretamente com a API em produção no heroku, então caso você clone o projeto, para ele funcionar
direitinho, você tera que configurar o arquivo next.config.js na pasta clonada. Lá existe uma variável chamada SECRET_KEY, ela precisa corresponder a SECRET_KEY configurada no Docker do servidor para garantir a segurança do Token do usuário. o valor dessa variável deve ser
"secret_key" se rodado localmente.
- Após a configuração da SECRET_KEY, é só rodar yarn dev no terminal, e pronto, tudo funcionando para testes.
- O repositório desta API está em produção e à partir deste (https://tech-cash-challenge-api.herokuapp.com/) link e com um insomnia você pode acessar todas as rotas.

## Rotas
### Para facilitar sua vida, vou deixar as rotas documentadas aqui:
- URL BASE: em produção - https://tech-cash-challenge-api.herokuapp.com
- URL BASE: localmente - http://localhost:3000
- REGISTRO DE NOVO USUÁRIO - /users
- LOGIN DE USUÁRIO - /login
- LISTAGEM DETALHADA DE USUÁRIO - /users/:id
- CRIAÇÃO DE NOVA TRANSFERÊNCIA - /transactions
- LISTAGEM DE TRANSFERÊNCIAS FILTRADAS:
    - /users/:id/cash-in (filtrará todas as trasnferências de cash-in)
    - /users/:id/cash-out (filtrará todas as trasnferências de cash-out)
    - /users/:id/order/asc (filtrará todas as trasnferências por ordem da mais antiga para mais recente)
    - /users/:id/order/desc (filtrará todas as trasnferências por ordem da mais recente para mais antiga)
