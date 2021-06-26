require('dotenv').config()
const fs = require('fs')

const data = require('../../data/ta.json')
const TEAM = process.env.TEAM
const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const dates = data.date.map( e => e.split(' ')).map( e => '20'+e[0].replace('/','-').replace('/','-'))
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e) ))
const home = data.home
const away = data.away

let dados = ''
let indexScore = 0
home.forEach( (team, index) => {
  if(team === TEAM){    
    dados += `{ 
      time: "${TEAM}",
      data: new Date("${dates[index]}T00:00:00Z"),
      handicap_inicial: ${odds[index][0]},
      linha_cantos: ${odds[index][2]},
      time_casa: "${team}",
      time_fora: "${away[index]}",
      gols_feitos: ${scores[indexScore][0]},
      gols_sofridos: ${scores[indexScore][1]},
      gols_feitos_1st: ${scores[indexScore+1][0]},
      gols_sofridos_1st: ${scores[indexScore+1][1]},
      cantos_feitos: ${corners[indexScore+1][0]},
      cantos_sofridos: ${corners[indexScore+1][1]},
      cantos_feitos_1st: ${corners[indexScore][0]},
      cantos_sofridos_1st: ${corners[indexScore][1]} \n},`    
  } else {
    dados+= `{ 
    time: "${TEAM}",
    data: new Date("${dates[index]}T00:00:00Z"),
    handicap_inicial: ${odds[index][0]},
    linha_cantos: ${odds[index][2]},
    time_fora: "${away[index]}",
    time_casa: "${team}",
    gols_feitos: ${scores[indexScore][1]},
    gols_sofridos: ${scores[indexScore][0]},
    gols_feitos_1st: ${scores[indexScore+1][1]},
    gols_sofridos_1st: ${scores[indexScore+1][0]} ,
    cantos_feitos: ${corners[indexScore+1][1]},
    cantos_sofridos: ${corners[indexScore+1][0]},
    cantos_feitos_1st: ${corners[indexScore][1]},
    cantos_sofridos_1st: ${corners[indexScore][0]} \n},`    
  }
  indexScore+=2
})

const insert = `insert( [ \n${dados} \n] )`

fs.appendFileSync(`${__dirname}/insertMongo.txt`, `\n${insert}`)
