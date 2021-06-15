const args = process.argv.slice(2)
const teamName = args[0]

const data = require(`../../../teamData/${teamName}.json`)
const TEAM = teamName

const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e)))
const home = data.home
const away = data.away

let scoresFT = []
let scoresHT = []
scores.forEach( (e, i) => {
  i%2 === 0 ? scoresFT.push(e) : scoresHT.push(e)
})

let cornersFT = []
let cornersHT = []
corners.forEach( (e, i) => {
  i%2 === 0 ? cornersHT.push(e) : cornersFT.push(e)
})

function getMatchOddsFavorito(handicap){
  // Jogos como favorito
  const jogosCasa = home.map( team => team === teamName && odds[i][0] <= handicap).length
  const jogosFora = home.map( team => team !== teamName && odds[i][0] >= handicap*-1).length

  const vitoriasCasa = home.map( (team, i) => {    
    return team == teamName && scoresFT[i][0] > scoresFT[i][1] && odds[i][0] <= handicap
  })
  .filter(e => e).length
  const empatesCasa = home.map( (team, i) => {
    return team == teamName && scoresFT[i][0] == scoresFT[i][1] && odds[i][0] <= handicap
  })
  .filter(e => e).length
  const derrotasCasa = home.map( (team, i) => {
    return team == teamName && scoresFT[i][0] < scoresFT[i][1] && odds[i][0] <= handicap
  })
  .filter(e => e).length
  const vitoriasFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] < scoresFT[i][1] && odds[i][0] >= handicap*-1
  })
  .filter(e => e).length
  const empatesFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] == scoresFT[i][1] && odds[i][0] >= handicap*-1
  })
  .filter(e => e).length
  const derrotasFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] > scoresFT[i][1] && odds[i][0] >= handicap*-1
  })
  .filter(e => e).length  
  return { 
    jogosCasa, jogosFora,
    vitoriasCasa ,empatesCasa ,derrotasCasa,
    vitoriasFora ,empatesFora ,derrotasFora 
  }
}
getMatchOddsFavorito(-0.5)

function getMatchOdds(){  
  const jogosCasa = home.map( team => team === teamName).length
  const jogosFora = home.map( team => team !== teamName).length

  const vitoriasCasa = home.map( (team, i) => {    
    return team == teamName && scoresFT[i][0] > scoresFT[i][1]
  })
  .filter(e => e).length
  const empatesCasa = home.map( (team, i) => {
    return team == teamName && scoresFT[i][0] == scoresFT[i][1]
  })
  .filter(e => e).length
  const derrotasCasa = home.map( (team, i) => {
    return team == teamName && scoresFT[i][0] < scoresFT[i][1]
  })
  .filter(e => e).length
  const vitoriasFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] < scoresFT[i][1]
  })
  .filter(e => e).length
  const empatesFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] == scoresFT[i][1]
  })
  .filter(e => e).length
  const derrotasFora = home.map( (team, i) => {
    return team !== teamName && scoresFT[i][0] > scoresFT[i][1]
  })
  .filter(e => e).length  
  return { 
    jogosCasa, jogosFora,
    vitoriasCasa ,empatesCasa ,derrotasCasa,
    vitoriasFora ,empatesFora ,derrotasFora 
  }
}

function getGols(){  
  const jogosCasa = home.map( team => team === teamName).length
  const jogosFora = home.map( team => team !== teamName).length
  
  const bttsCasa = home.map( team => {
    return team === teamName && scoresFT[i][0] > 0 && scoresFT[i][1] > 0
  }).length

  const bttsFora = home.map( team => {
    return team !== teamName && scoresFT[i][0] > 0 && scoresFT[i][1] > 0
  }).length
  
}


module.exports = {
  TEAM, 
  getMatchOddsFavorito, 
  getMatchOdds
}