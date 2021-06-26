const args = process.argv.slice(2)
const teamName = args[0]

const data = require(`../../../${teamName}`)
const TEAM = teamName.replace('-', ' ').replace('.json','').replace('import/','')

const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e)))
const home = data.home
const away = data.away

let scoresFT = []
let scoresHT = []
scores.forEach( (e, i) => { i%2 === 0 ? scoresFT.push(e) : scoresHT.push(e) })

let cornersFT = []
let cornersHT = []
corners.forEach( (e, i) => { i%2 === 0 ? cornersHT.push(e) : cornersFT.push(e) })

function getCantos(){
  const jogosCasa = home.map( team => team === TEAM).filter(e => e).length
  const jogosFora = home.map( team => team !== TEAM).filter(e => e).length
  let cantosCasa = [0, 0]
  let cantosFora = [0, 0]
  home.forEach( (e, i) =>{
    e == TEAM ? cantosCasa[0]+=cornersFT[i][0] : 0
    e == TEAM ? cantosCasa[1]+=cornersFT[i][1] : 0
    e !== TEAM ? cantosFora[0]+=cornersFT[i][0] : 0
    e !== TEAM ? cantosFora[1]+=cornersFT[i][1] : 0
  })

  return {
    jogosCasa, jogosFora,
    cantosCasa, cantosFora
  }

}

module.exports = {
  TEAM,
  getCantos
}