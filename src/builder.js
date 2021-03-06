const fs = require('fs')
const readlineSync = require('readline-sync');
const format = require('pg-format');

const nameJson = readlineSync.question('Get JSON data/json/: ') || 'data';
const games = require(`../data/json/${nameJson}.json`)

function matches(games) {
  const scores = games.scores.map( (score) => ( score.split(":") ) )
  const corners = games.corners.map( (ele) => ele.split(":") )
  const date = games.date.map(element => '20'+element.replace(element.substr(8), '') )
  const base = []
  let indexScore = 0
  games.home.forEach( (element, i) => {    
    base.push(
      [
        date[i].trim(), [element.trim(), games.away[i].trim() ],
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

const tableName = readlineSync.question('Name of Table: ') || 'table';

sql = format(`INSERT INTO ${tableName}(game_date, team_home, team_away,
                home_ft, away_ft, home_ht, away_ht,
                corners_home_ft, corners_away_ft, corners_home_ht, corners_away_ht) 
              VALUES %L`, data); 

fs.writeFileSync(__dirname+`/../data/sql/${nameJson}.sql`, sql, (err) => {
  if (err) throw err;  
})