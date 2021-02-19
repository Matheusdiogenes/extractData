const fs = require('fs')
const format = require('pg-format');
const games = require('./data.json')
const league = 'italia'

function matches(games) {
  const scores = games.scores.map( (score) => ( score.split(":") ) )
  const corners = games.corners.map( (ele) => ele.split(":") )
  const date = games.date.map(element => '20'+element.replace(element.substr(8), '') )
  const base = []
  let indexScore = 0
  games.home.forEach( (element, i) => {    
    base.push(
      [
        date[i].trim(), [element.trim(), games.away[i].trim() ], "PL",
        [scores[indexScore][0].trim(), scores[indexScore][1].trim()],
        [scores[indexScore+1][0].trim(), scores[indexScore+1][1].trim()],
        [corners[indexScore+1][0].trim(), corners[indexScore+1][1].trim()],
        [corners[indexScore][0].trim(), corners[indexScore][1].trim()]
      ]
    )
      indexScore+=2
  });
  return base
}
const data = matches(games)

sql = format(`INSERT INTO ${league}(game_date, team_home, team_away,
                home_ft, away_ft, home_ht, away_ht, league,
                corners_home_ht, corners_away_ht, corners_home_ft, corners_away_ft) 
              VALUES %L`, data); 


fs.writeFileSync(__dirname+'/insert.sql', sql, (err) => {
  if (err) throw err;
})