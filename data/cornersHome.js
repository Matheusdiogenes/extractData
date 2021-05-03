require('dotenv').config()
const gamesP1 = require(`./json/th1.json`) 
const scoresP1 = gamesP1.scores.map( (score) => ( score.split(":") ) )
const cornersP1 = gamesP1.corners.map( (ele) => ele.split(":") )
const dateP1 = gamesP1.date.map(element => '20'+element.replace(element.substr(8), '') )

const gamesP2 = require(`./json/th2.json`) 
const scoresP2 = gamesP2.scores.map( (score) => ( score.split(":") ) )
const cornersP2 = gamesP2.corners.map( (ele) => ele.split(":") )
const dateP2 = gamesP2.date.map(element => '20'+element.replace(element.substr(8), '') )

const lado1 = gamesP1.home.concat(gamesP2.home)
const lado2 = gamesP1.away.concat(gamesP2.away)
const scores = scoresP1.concat(scoresP2)
const corners = cornersP1.concat(cornersP2)

const team = process.env.TEAM_HOME
// STATS TOTAL 10 primeiros jogos
let feitos = 0
let sofridos = 0
let feitosHT = 0
let sofridosHT = 0
let over10 = 0
let over9 = 0

// STATS Home 10 primeiros jogos
let feitosMando = 0
let sofridosMando = 0
let feitosHTmando = 0
let sofridosHTmando = 0
let over10Mando = 0
let over9Mando = 0

// Afirmações
let fezMaisQue4cantos = 0
let fezMaisQue4cantosMando = 0

// auxiliares
let quantidadeMando = 6
let quantidadeJogos = 10
let controlMando = 0

let indexScore = 0
lado1.forEach( (element, i) => {    
    let lado1FeitosHT = corners[indexScore][0] - 0
    let lado2FeitosHT = corners[indexScore][1] - 0
    let totalHT = lado1FeitosHT + lado2FeitosHT
    let lado1FeitosFT = corners[indexScore+1][0] - 0
    let lado2FeitosFT = corners[indexScore+1][1] - 0
    let totalFT = lado1FeitosFT + lado2FeitosFT

    // total
    if(lado1[i] === team && i < quantidadeJogos){
      feitos += lado1FeitosFT
      sofridos += lado2FeitosFT
      feitosHT += lado1FeitosHT
      sofridosHT += lado2FeitosHT
      
      if(lado1FeitosFT > 4){
        fezMaisQue4cantos++
      }
    } else if(lado2[i] === team && i < quantidadeJogos) {
      feitos += lado2FeitosFT
      sofridos += lado1FeitosFT
      feitosHT += lado2FeitosHT
      sofridosHT += lado1FeitosHT
      if(lado2FeitosFT > 4){
        fezMaisQue4cantos++
      }
    }

    if(lado1FeitosFT+lado2FeitosFT > 10 && i < quantidadeJogos) {
      over10++
    } 
    if (lado1FeitosFT+lado2FeitosFT > 9 && i < quantidadeJogos) {
      over9++
    }

    // mando
    if(lado1[i] === team && controlMando < quantidadeMando){      
      controlMando++      
      feitosMando += lado1FeitosFT
      sofridosMando += lado2FeitosFT
      feitosHTmando += lado1FeitosHT
      sofridosHTmando += lado2FeitosHT
      if(lado1FeitosFT > 4){
        fezMaisQue4cantosMando++
      }
      if(lado1FeitosFT+lado2FeitosFT > 10 ) {
        over10Mando++
      } 
      if (lado1FeitosFT+lado2FeitosFT > 9 ) {
        over9Mando++
      }
    }
    
    indexScore+=2
  });

  
  console.log(`Nos últimos ${quantidadeJogos} jogos do ${team}
  Médias FullTime: 
    Feitos ${feitos/quantidadeJogos}
    Sofridos ${sofridos/quantidadeJogos}
    Total ${(feitos+sofridos)/quantidadeJogos}  
  Médias HalfTime: 
    Feitos ${feitosHT/quantidadeJogos}
    Sofridos ${sofridosHT/quantidadeJogos}
    Total ${(feitosHT+sofridosHT)/quantidadeJogos}
  Over: 
    Over 9 (${over9}/${quantidadeJogos})
    Over 10 (${over10}/${quantidadeJogos})
`);

const mediaMando = (feitosMando+sofridosMando)/quantidadeMando
const mediaMandoHT = (feitosHTmando+sofridosHTmando)/quantidadeMando

console.log(`\nNos últimos ${quantidadeMando} em casa
Médias: 
  Feitos: ${(feitosMando/quantidadeMando).toFixed(1)}
  Sofridos: ${(sofridosMando/quantidadeMando).toFixed(1)}
  Total ${mediaMando.toFixed(1)}
Médias HalfTime: 
  Feitos ${(feitosHTmando/quantidadeMando).toFixed(1)}
  Sofridos ${(sofridosHTmando/quantidadeMando).toFixed(1)}
  Total ${mediaMandoHT.toFixed(1)}
Over: 
  Over 9 (${over9Mando}/${quantidadeMando})   
  Over 10 (${over10Mando}/${quantidadeMando})
`);