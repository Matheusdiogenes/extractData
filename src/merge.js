require('dotenv').config()
const fs = require('fs')

const envs = require('./env')
const amount = envs.amountSession
const args = process.argv.slice(2)

const teamName = args[0]

function getTeam(amount, nomeJson, chave){
  let dados = []
  for (let index = 1; index <= amount; index++) {
    let data = require(`../data/${nomeJson}${index}.json`)    
    data[chave].forEach(e => dados.push(e))
  }

  return dados
}


function merge(){
  
  for (let index = 0; index < envs.amountSession; index++) {
    const home = getTeam( amount, teamName, 'home')
    const away = getTeam( amount, teamName, 'away')
    const scores = getTeam( amount, teamName, 'scores')
    const corners = getTeam( amount, teamName, 'corners')
    const date = getTeam( amount, teamName, 'date')
    const odds = getTeam( amount, teamName, 'odds')    
    fs.writeFile(`${__dirname}/../import/${teamName}.json`, JSON.stringify({team: teamName, home,  away,  scores,  corners,  date, odds}, null, 2), err => {
      if(err) throw new Error(err)
    })    
  }    
  console.log(`Generated JSON: import/${teamName}.json`);    
  
}
merge()

