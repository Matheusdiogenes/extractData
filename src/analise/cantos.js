const prog = require('./prognostico/getCantos')

const args = process.argv.slice(2)
const linhaAsiatica = args[1]

function cantos(mando){
  const c = prog.getCantos()
  const jogos = c[`jogos${mando}`]
  const feitos = c[`feitos${mando}`]
  const sofridos = c[`sofridos${mando}`]
  const media = c[`media${mando}`]
  const overPorc = c[`over10asi${mando}`] / c[`jogos${mando}`]
  const over10asi = c[`over10asi${mando}`]
  const race5 = c[`race5${mando}`]
  const race7 = c[`race7${mando}`]
  console.log(`Médias do ${prog.TEAM} (${mando}): Jogos -> ${jogos} | Feitos -> ${feitos.toFixed(2)} | Sofridos -> ${sofridos.toFixed(2)} | Media -> ${media.toFixed(2)} \nJogos com 10 ou mais cantos -> ${(overPorc*100).toFixed(2)}% (${over10asi}/${jogos})`);  
}

function cantosFavorito(mando){
  const cf = prog.getCantosFavorito(-0.5)
  const jogos = cf[`jogos${mando}`]
  const feitos = cf[`feitos${mando}`]
  const sofridos = cf[`sofridos${mando}`]
  const media = cf[`media${mando}`]
  const overPorc = cf[`over10asi${mando}`] / cf[`jogos${mando}`]
  const over10asi = cf[`over10asi${mando}`]
  const race5 = cf[`race5${mando}`]
  const race7 = cf[`race7${mando}`]
  console.log(`Médias do ${prog.TEAM} (${mando}): Jogos -> ${jogos} | Feitos -> ${feitos.toFixed(2)} | Sofridos -> ${sofridos.toFixed(2)} | Media -> ${media.toFixed(2)} \nJogos com 10 ou mais cantos -> ${(overPorc*100).toFixed(2)}% (${over10asi}/${jogos})`);  
}

function linhaCantos(mando){
  const lc = prog.getLinhaCantos(linhaAsiatica)
  const jogos = lc[`linha${mando}`]
  const overAsi = lc[`overAsi${mando}`]  
  
  console.log(`${mando}: Atigiu os ${linhaAsiatica}: (${overAsi}/${jogos})`);  
}

cantos('Casa')
cantos('Fora')
console.log("Considerando a linha de cantos:");
linhaCantos('Casa')
linhaCantos('Fora')
// cantosFavorito('Casa')