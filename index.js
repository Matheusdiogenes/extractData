const puppeteer = require('puppeteer');
const fs = require('fs')


async function start(){
  
  async function getTeams(page, selector){
    const teams = await page.$$eval(selector, teams => teams.map( team => team.textContent.replaceAll(/[0-9]/g, '').replaceAll('[]', '').trim() ) )    
    return teams
  }

  async function getScores(page, selector){
    const scores = await page.$$eval(selector, scores => scores.map( score => score.innerText.replaceAll(':', '').replaceAll(' ', '').trim() ) )
    return scores
  }

  async function getCorners(page, selector){
    const corners = await page.$$eval(selector, corners => corners.map( corner => corner.innerText.replaceAll(':', '').replaceAll(' ','').trim() ) )
    return corners

  }
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.scorebing.com/league/37', {timeout: 0});
  // await page.screenshot({ path: 'example.png' });

  let teamHome = await getTeams(page, 'section#ended > table > tbody tr td.text-right')
  let teamAway = await getTeams(page, 'section#ended > table > tbody tr td.text-left')
  let scores = await getScores(page, 'tbody tr td.text-center.red-color')
  let corners = await getCorners(page, 'section#ended > table > tbody tr td.text-center.blue-color')
  
  fs.writeFile('games.json', JSON.stringify({home: teamHome, away: teamAway, score: scores, corner: corners}, null, 2), err => {
    if(err) throw new Error('ERROR')
    console.log('Done');

  })

  console.log(`${Object.values(teamHome)[0]} ${Object.values(scores)[0][0]} x ${Object.values(scores[0][1])} ${Object.values(teamAway)[0]}`)
  await browser.close()
};

start()