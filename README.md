# EXTRACT DATA
 
Projetinho pessoal feito para extrair dados do site www.scorebing.com. E gerar um arquivo SQL com esses dados para inserir em uma tabela no banco de dados.
 
A código da TABELA está no arquivo `table.txt`
 
## Como usar ?
 
1. Instale as dependências necessárias.
 
> npm install
 
2. Crie um arquivo .env e coloque as variáveis que estão em .env.exemple
 
A variável __URL__ indica o link do campeonato
 
A variável __LEAGUE_ID__ você pode encontrar no fim da __URL__
 
Exemplo:
 
URL=https://www.scorebing.com/league/35
 
LEAGUE_ID=35
 
3. Execute o arquivo index.js
 
> node src/index.js
 
Responda às duas perguntas que serão feitas no seu bash.
 
A primeira pergunta indica qual nome do arquivo você deseja colocar.
 
A segunda pergunta indica qual seção estão os dados.
 
Após isso será gerado um arquivo JSON no diretório `data/json/`
 
4. Execute o arquivo builder.js
 
> node src/builder.js
 
Responda às duas perguntas que serão feitas no seu bash.
 
A primeira pergunta se refere ao nome do arquivo JSON que está no diretório `data/json/{NomeDoArquvo}`.
 
A segunda pergunta se refere ao nome da TABELA que está no seu banco de dados.
 
Após isso será gerado um arquivo de inserção SQL com os dados extraídos do site. Execute-o.

