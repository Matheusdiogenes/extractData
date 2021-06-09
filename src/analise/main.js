require('dotenv').config()

const data = require('../../data/ta.json')

const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const dates = data.date.map( e => e.split(' ')).map( e => '20'+e[0])
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e) ))
console.log(corners);

const team = "Sassuolo"
function venceComoFavorito(){

}

let vitoriasEmCasa = 0
let empatesEmCasa = 0
let derrotasEmCasa = 0
let vitoriasFora = 0
let empatesFora = 0
let derrotasFora = 0
let indexScore = 0
data.home.forEach( (time, i) => {
  // console.log(`${time} ${scores[indexScore][0]} x ${scores[indexScore][1]} ${data.away[i]}`);  
  
  if(time == team){
    if(scores[indexScore][0] > scores[indexScore][1]){
      vitoriasEmCasa++
    } else if(scores[indexScore][0] === scores[indexScore][1]){
      empatesEmCasa++
    } else {
      derrotasEmCasa++
    }
  } else {
    if(scores[indexScore][0] < scores[indexScore][1]){
      vitoriasFora++
    } else if(scores[indexScore][0] === scores[indexScore][1]){
      empatesFora++
    } else {
      derrotasFora++
    }
  }
  indexScore+=2
})

// console.log(`${team} em casa: ${vitoriasEmCasa}V ${empatesEmCasa}E ${derrotasEmCasa}D`);
// console.log(`${team} fora: ${vitoriasFora}V ${empatesFora}E ${derrotasFora}D`);