const games = require('./games.json')

let scores = []
games.scores.forEach((ele) => {
  scores.push(ele.split(":"))  
})

let corners = []

games.corners.forEach((ele) => {
  corners.push(ele.split(":"))  
})

console.log(`${games.home[0]} ${scores[0][0]} vs ${scores[0][1]} ${games.away[0]} HT ${scores[1][0]} - ${scores[1][1]} CORNERS FT ${corners[1][0]} - ${corners[1][1]} HT ${corners[0][0]} - ${corners[0][1]} `);  

