const args = process.argv.slice(2)
const teamName = args[0]

const data = require(`../../../teamData/${teamName}.json`)
const TEAM = teamName.replace('.', ' ')

const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e)))
const home = data.home
const away = data.away

function getCantos(){  
  
}

function getCantosFavorito(handicap){  
  
}

function getLinhaCantos(linhaAsiatica){  
  const linhaCasa = odds.filter( (e, index) => e[2] == linhaAsiatica && home[index] == TEAM).length
  const linhaFora = odds.filter( (e, index) => e[2] == linhaAsiatica && away[index] == TEAM).length
  
}

module.exports = {
  TEAM,
  getCantos,
  getCantosFavorito, 
  getLinhaCantos,
}