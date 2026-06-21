# Express Avancado

Projeto Node.js com Express, TypeScript, Prisma, MySQL/MariaDB e views em Handlebars.

## Requisitos

- Node.js instalado
- npm instalado
- Docker instalado, caso queira subir o banco via container

## Instalar dependencias

Na raiz do projeto, execute:

```bash
npm install
```

## Configurar variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto. Exemplo:

```env
NODE_ENV=development
PORT=3333
OUTDIR=saida
DATABASE_URL="mysql://root:senhasegura@127.0.0.1:3307/game"
SECRET="troque-este-segredo"
```

Variaveis usadas pela aplicacao:

- `NODE_ENV`: ambiente da aplicacao, por exemplo `development`
- `PORT`: porta onde o Express vai rodar
- `OUTDIR`: pasta onde o arquivo de log `access.log` sera salvo
- `DATABASE_URL`: URL de conexao com o banco MySQL
- `SECRET`: chave usada pela sessao do Express

## Subir o banco com Docker

Crie a rede Docker:

```bash
docker network create game-app-network
```

Suba o MySQL:

```bash
docker run -d \
  --name game-app-db \
  --network game-app-network \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=senhasegura \
  -e MYSQL_DATABASE=game \
  -v game-app-volume:/var/lib/mysql \
  mysql:latest
```

Opcionalmente, suba o phpMyAdmin:

```bash
docker run -d \
  --name game-app-phpmyadmin \
  --network game-app-network \
  -e PMA_HOST=game-app-db \
  -e PMA_PORT=3306 \
  -e PMA_USER=root \
  -e PMA_PASSWORD=senhasegura \
  -p 8081:80 \
  phpmyadmin/phpmyadmin
```

O phpMyAdmin ficara disponivel em:

```text
http://localhost:8081
```

Para acessar o banco pelo terminal:

```bash
mysql -uroot -psenhasegura -h127.0.0.1 -P3307 game
```

## Preparar o Prisma

Gere o cliente Prisma:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Se quiser visualizar o banco pelo Prisma Studio:

```bash
npx prisma studio
```

## Rodar em desenvolvimento

Este projeto compila TypeScript para a pasta `build` e executa a aplicacao a partir dela.

Em um terminal, deixe o TypeScript compilando em modo watch:

```bash
npm run build
```

Em outro terminal, inicie o servidor:

```bash
npm start
```

A aplicacao ficara disponivel em:

```text
http://localhost:3333
```

Se a variavel `PORT` tiver outro valor, use a porta configurada no `.env`.

## Rodar em producao

Compile o projeto uma vez:

```bash
npx tsc
```

Depois inicie com Node:

```bash
npm run start:prod
```

## Rotas principais

- `GET /`: pagina inicial
- `GET /sobre`: pagina sobre
- `GET /lorem/:num`: gera texto lorem ipsum
- `GET /bemvindo/:nome`: pagina de boas-vindas
- `GET /hb1`, `/hb2`, `/hb3`, `/hb4`: exemplos com Handlebars
- `GET /majors`: lista cursos
- `GET /majors/create`: formulario para criar curso
- `POST /majors/create`: cria curso
- `GET /majors/read/:id`: mostra um curso
- `GET /majors/update/:id`: formulario para editar curso
- `POST /majors/update/:id`: atualiza curso
- `POST /majors/remove/:id`: remove curso
- `GET /signup`: formulario de cadastro
- `POST /logout`: logout

## Logs

A aplicacao grava acessos em:

```text
saida/access.log
```

Esse caminho depende da variavel `OUTDIR`.

## Parar containers

Para parar os containers:

```bash
docker stop game-app-db game-app-phpmyadmin
```

Para remover os containers:

```bash
docker rm game-app-db game-app-phpmyadmin
```
