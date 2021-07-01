const puppeteer = require('puppeteer');
const fs = require('fs')
const envs = require('./env')

async function start (session, teamName, idTeam, url){  
  
  async function part(page, numberPart){    
    await page.setViewport({ width: 1366, height: 10000 })      
    await page.select('select#pager_select', `/team/${idTeam}/p.${numberPart}?type=ended_race`)      
    await page.waitForSelector('#pager_select') 
    await page.waitForTimeout(2000);
    
  }

  async function getText(page, selector){
    const text = await page.$$eval(selector, texts => texts.map( text => text.innerText));    
    return text
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);  

  await part(page, session)
  // await page.screenshot({path: 'buddy-screenshot.png'})
  const team = await getText(page, '#pjax-container > div:nth-child(2) > div > div > div.teamInfo > h1')
  const home = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-right.BR0 a');  
  const away = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-left a');
  const scores = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.red-color')
  const corners = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.blue-color')
  const date = await getText(page, '#ended .live-list-table.diary-table tbody tr td:nth-child(2)')
  const odds = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center a[rel]')

  fs.writeFile(`${__dirname}/../data/${teamName}${session}.json`, JSON.stringify({team: team[0], home,  away,  scores,  corners,  date, odds}, null, 2), err => {
    if(err) throw new Error(err)
    console.log(`Generated JSON: ../data/${teamName}${session}.json `);

  })

  await browser.close();
}

async function load(){  
    
  for (let session = 1; session <= envs.amountSession; session++) {
    let team = `${envs.teamId}${session}`
    let id = envs.teamId
    let url = envs.teamUrl
    await start(session, team, id, url)
  }      
  
}

load()