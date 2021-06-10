const data = require('../../teamData/ita.json')
const TEAM = 'Sassuolo'
const odds = data.odds.map( e => e.split('/').map( e => parseFloat(e)))
const scores = data.scores.map( e => e.split(':').map( e => parseInt(e)))
const corners = data.corners.map( e => e.split(":").map( e => parseInt(e)))
const home = data.home
const away = data.away

function getMatchOddsFavorito(handicap){  
  let vitoriasCasa = 0, empatesCasa = 0, derrotasCasa = 0
  let vitoriasFora = 0, empatesFora = 0, derrotasFora = 0
  let ambasMarcamCasa = 0, ambasMarcamFora = 0
  let indexScore = 0
  home.forEach( (team, index) => {
    if(team === TEAM && odds[index][0] <= handicap){
      scores[indexScore][0] >  scores[indexScore][1] ? vitoriasCasa++ : vitoriasCasa
      scores[indexScore][0] == scores[indexScore][1] ? empatesCasa++ : empatesCasa
      scores[indexScore][0] <  scores[indexScore][1] ? derrotasCasa++ : derrotasCasa
      scores[indexScore][0] > 0 && scores[indexScore][1] > 0 ? ambasMarcamCasa++ : ambasMarcamCasa
  
    } else if(team !== TEAM && odds[index][0] >= handicap*-1){      
      scores[indexScore][1] >  scores[indexScore][0] ? vitoriasFora++ : vitoriasFora
      scores[indexScore][1] == scores[indexScore][0] ? empatesFora++ : empatesFora
      scores[indexScore][1] <  scores[indexScore][0] ? derrotasFora++ : derrotasFora
      scores[indexScore][0] > 0 && scores[indexScore][1] > 0 ? ambasMarcamFora++ : ambasMarcamFora
    }
    indexScore+=2
  })
  return {vitoriasCasa, empatesCasa, derrotasCasa, vitoriasFora, empatesFora, derrotasFora, ambasMarcamCasa, ambasMarcamFora}
}

function getMatchOdds(){  
  let vitoriasCasa = 0, empatesCasa = 0, derrotasCasa = 0
  let vitoriasFora = 0, empatesFora = 0, derrotasFora = 0
  let ambasMarcamCasa = 0, ambasMarcamFora = 0
  let indexScore = 0
  home.forEach( (team, index) => {
    if(team === TEAM ){      
      scores[indexScore][0] >  scores[indexScore][1] ? vitoriasCasa++ : vitoriasCasa
      scores[indexScore][0] == scores[indexScore][1] ? empatesCasa++ : empatesCasa
      scores[indexScore][0] <  scores[indexScore][1] ? derrotasCasa++ : derrotasCasa
      scores[indexScore][0] > 0 && scores[indexScore][1] > 0 ? ambasMarcamCasa++ : ambasMarcamCasa
  
    } else if(team !== TEAM){      
      scores[indexScore][1] >  scores[indexScore][0] ? vitoriasFora++ : vitoriasFora
      scores[indexScore][1] == scores[indexScore][0] ? empatesFora++ : empatesFora
      scores[indexScore][1] <  scores[indexScore][0] ? derrotasFora++ : derrotasFora
      scores[indexScore][0] > 0 && scores[indexScore][1] > 0 ? ambasMarcamFora++ : ambasMarcamFora
    }
    indexScore+=2
  })
  return {vitoriasCasa, empatesCasa, derrotasCasa, vitoriasFora, empatesFora, derrotasFora, ambasMarcamCasa, ambasMarcamFora}
}

function getCantos(){  
  let jogosCasa = 0, feitosCasa = 0, sofridosCasa = 0, race5casa = 0, race7casa = 0, over10asiCasa = 0
  let jogosFora = 0, feitosFora = 0, sofridosFora = 0, race5fora = 0, race7fora = 0, over10asiFora = 0
  let indexScore = 0
  home.forEach( (team, index) => {
    if(team === TEAM ){
      jogosCasa++
      feitosCasa+= corners[indexScore+1][0]
      sofridosCasa+= corners[indexScore+1][1]
      corners[indexScore+1][0] >= 5 ? race5casa++ : race5casa
      corners[indexScore+1][0] >= 7 ? race7casa++ : race7casa
      corners[indexScore+1][0] + corners[indexScore+1][1] >= 10 ? over10asiCasa++ : over10asiCasa

    } else if(team !== TEAM){
      jogosFora++
      feitosFora+= corners[indexScore+1][1]
      sofridosFora+= corners[indexScore+1][0]
      corners[indexScore+1][1] >= 5 ? race5fora++ : race5fora
      corners[indexScore+1][1] >= 7 ? race7fora++ : race7fora
      corners[indexScore+1][1] + corners[indexScore+1][0] >= 10 ? over10asiFora++ : over10asiFora      
    }
    indexScore+=2
  })
  
  feitosCasa /= jogosCasa;
  sofridosCasa /= jogosCasa;
  feitosFora /= jogosFora;
  sofridosFora /= jogosFora;
  const mediaCasa = feitosCasa + sofridosCasa
  const mediaFora = feitosFora + sofridosFora
  const media = (mediaCasa + mediaFora) / 2
  const jogos = jogosCasa + jogosFora
  
  return { jogos, jogosCasa, jogosFora, media, mediaCasa, mediaFora, feitosCasa, sofridosCasa, feitosFora, sofridosFora, race5casa, race7casa, race5fora, race7fora, over10asiCasa, over10asiFora}
}

function getCantosFavorito(handicap){  
  let jogosCasa = 0, feitosCasa = 0, sofridosCasa = 0, race5casa = 0, race7casa = 0, over10asiCasa = 0
  let jogosFora = 0, feitosFora = 0, sofridosFora = 0, race5fora = 0, race7fora = 0, over10asiFora = 0
  let indexScore = 0
  home.forEach( (team, index) => {
    if(team === TEAM && odds[index][0] <= handicap){
      jogosCasa++
      feitosCasa+= corners[indexScore+1][0]
      sofridosCasa+= corners[indexScore+1][1]
      corners[indexScore+1][0] >= 5 ? race5casa++ : race5casa
      corners[indexScore+1][0] >= 7 ? race7casa++ : race7casa
      corners[indexScore+1][0] + corners[indexScore+1][1] >= 10 ? over10asiCasa++ : over10asiCasa

    } else if(team !== TEAM >= odds[index][0] <= handicap*-1){
      jogosFora++
      feitosFora+= corners[indexScore+1][1]
      sofridosFora+= corners[indexScore+1][0]
      corners[indexScore+1][1] >= 5 ? race5fora++ : race5fora
      corners[indexScore+1][1] >= 7 ? race7fora++ : race7fora
      corners[indexScore+1][1] + corners[indexScore+1][0] >= 10 ? over10asiFora++ : over10asiFora      
    }
    indexScore+=2
  })
  
  feitosCasa /= jogosCasa;
  sofridosCasa /= jogosCasa;
  feitosFora /= jogosFora;
  sofridosFora /= jogosFora;
  const mediaCasa = feitosCasa + sofridosCasa
  const mediaFora = feitosFora + sofridosFora
  const media = (mediaCasa + mediaFora) / 2
  const jogos = jogosCasa + jogosFora
  
  return { jogos, jogosCasa, jogosFora, media, mediaCasa, mediaFora, feitosCasa, sofridosCasa, feitosFora, sofridosFora, race5casa, race7casa, race5fora, race7fora, over10asiCasa, over10asiFora}
}
const matchOdds = getMatchOdds()
console.log(matchOdds.vitoriasCasa)