# EXTRACT DATA

Projetinho pessoal feito para extrair dados do site www.scorebing.com. E obter as estatística de um time.

## Como usar ?

1. Instale as dependências necessárias.

> npm install

2. Execute o comando:

> node src/index.js [numeroDeSessões] [nome.Do.Time]

O nome do time encontra-se no arquivo `src/referencias.json`

3. Faça o merge dos arquivos gerados

> node src/analise/merge.js [quantidadeDeArquivos] [nome.Do.Time]

4. Obter o prognóstico de cantos execute:

> node src/analise/cantos.js [`nome.Do.Time`] [`LinhaDeCantos`]
