require('dotenv').config()
const fs = require('fs')
const args = process.argv.slice(2)
const quantidade = args[0]
const nomeJson = args[1]

function getTeam(quantidade, nomeJson, chave){
  let dados = []
  for (let index = 1; index <= quantidade; index++) {
    let data = require(`../../data/${nomeJson}${index}.json`)    
    data[chave].forEach(e => dados.push(e))
  }
  return dados
}

const home = getTeam( quantidade, nomeJson, 'home')
const away = getTeam( quantidade, nomeJson, 'away')
const scores = getTeam( quantidade, nomeJson, 'scores')
const corners = getTeam( quantidade, nomeJson, 'corners')
const date = getTeam( quantidade, nomeJson, 'date')
const odds = getTeam( quantidade, nomeJson, 'odds')

fs.writeFile(`${__dirname}/../../teamData/${nomeJson}.json`, JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date, odds: odds}, null, 2), err => {
  if(err) throw new Error(err)
  console.log(`Generated JSON: ../../teamData/${nomeJson}.json`);

})
// const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
// const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
// const dates = data.date.map( e => e.split(' ')).map( e => '20'+e[0])
// const corners = data.corners.map( e => e.split(":").map( e => parseInt(e) ))

