# EXTRACT DATA

Projetinho pessoal feito para extrair dados do site www.scorebing.com. E obter as estatística de um time.

## Como usar ?

1. Instale as dependências necessárias.

> npm install

2. Execute o comando:

> npm run get [numeroDeSessões] [ref]

O nome da referencia é o nome de um dos arquivos que está em `src/referencias/[ref].json`

3. Faça o merge dos arquivos gerados

> npm run merge [quantidadeDeArquivos] [ref]

O nome da referencia é o nome de um dos arquivos que está em `src/referencias/[ref].json`

4. Obter o prognóstico de gols execute:

> npm run gols [`nome-Do-Time`] [`handicap.initial`]

5. Obter o prognóstico de gols execute:

> npm run cantos [`import/nome-Do-Time.json`]
