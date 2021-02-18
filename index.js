const puppeteer = require('puppeteer');
const fs = require('fs')

async function start (){
  
  async function getTeams(page, selector){
    const teams = await page.$$eval(selector, teams => teams.map( team => team.innerText));    
    return teams
  }

  async function getScores(page, selector){
    const scores = await page.$$eval(selector, scores => scores.map( score => score.innerText));    
    return scores
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.scorebing.com/league/35');
  
  const home = await getTeams(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-right.BR0 a');
  const away = await getTeams(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-left a');
  const scores = await getScores(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.red-color')
  const corners = await getScores(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.blue-color')

  fs.writeFile('games.json', JSON.stringify({home: home, away: away, scores: scores, corners: corners}, null, 2), err => {
    if(err) throw new Error('ERROR')
    console.log('Done');

  })

  await browser.close();
}

start()