require('dotenv').config()
const fs = require('fs')
const args = process.argv.slice(2)
const quantidade = args[0]
const referencias = args[1]

function getTeam(quantidade, nomeJson, chave){
  let dados = []
  for (let index = 1; index <= quantidade; index++) {
    let data = require(`../data/${nomeJson}${index}.json`)    
    data[chave].forEach(e => dados.push(e))
  }

  return dados
}


function merge(){
  const ref = require(`./referencias/${referencias}.json`)
  const times = Array.from(Object.entries(ref.time))
  times.forEach(e => {
    const nomeJson = e[0] 
    const home = getTeam( quantidade, nomeJson, 'home')
    const away = getTeam( quantidade, nomeJson, 'away')
    const scores = getTeam( quantidade, nomeJson, 'scores')
    const corners = getTeam( quantidade, nomeJson, 'corners')
    const date = getTeam( quantidade, nomeJson, 'date')
    const odds = getTeam( quantidade, nomeJson, 'odds')
    fs.writeFile(`${__dirname}/../import/${nomeJson}.json`, JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date, odds: odds}, null, 2), err => {
      if(err) throw new Error(err)
      console.log(`Generated JSON: import/${nomeJson}.json`);    
    })
    console.log(`${e[0]} ${e[1].url} ${e[1].time_id}`);
  })
}
merge()

