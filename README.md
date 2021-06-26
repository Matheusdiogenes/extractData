# EXTRACT DATA

Projetinho feito para extrair dados do site www.scorebing.com. E obter as estatística de um time.

## Como usar ?

### Linux

1.  Execute o arquivo de configuração

> chmod +x config.sh && ./config.sh

2. Execute o comando para buscar os dados:

> chmod +x search.sh

> ./search.sh [`Numéro de jogos`] [`Arquivo de referência`]

[1] O número de jogos dividido por 10 deve ser um número inteiro. 

Exemplo: Quero buscar 10 jogos.

10/10 = 1

1 vai ser o primeiro parâmetro

[2] O nome da referência é o nome de um dos arquivos que está [aqui](https://github.com/Matheusdiogenes/extractData/tree/main/src/referencias)

3. Obter o prognóstico:

> chmod +x auto.sh && ./auto.sh
