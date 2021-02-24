const readlineSync = require('readline-sync');
const nameJson = readlineSync.question('VIEW $NAME_JSON.json): ');
const games = require(`./json/${nameJson}.json`)
const scores = games.scores.map( (score) => ( score.split(":") ) )
const corners = games.corners.map( (ele) => ele.split(":") )
const date = games.date.map(element => '20'+element.replace(element.substr(8), '') )

let indexScore = 0
games.home.forEach( (element, i) => {    
    console.log( `${date[i].trim()} | ${element.trim()} ${scores[indexScore][0].trim()} x  ${scores[indexScore][1].trim()} ${games.away[i].trim()} | HT ${scores[indexScore+1][0].trim()} X  ${scores[indexScore+1][1].trim()} CORNERS FT: ${corners[indexScore+1][0].trim()} X ${corners[indexScore+1][1].trim()}  HT: ${corners[indexScore][0].trim()}X${corners[indexScore][1].trim()}`      
    )
      indexScore+=2
  });