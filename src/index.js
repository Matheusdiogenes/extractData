const puppeteer = require('puppeteer');
const fs = require('fs')
const envs = require('./env')

async function start (){  
  
  async function part(page, idTeam, numberSession){    
    await page.setViewport({ width: 1366, height: 10000 })      
    await page.select('select#pager_select', `/team/${idTeam}/p.${numberSession}?type=ended_race`)      
    await page.waitForSelector('#pager_select') 
    await page.waitForTimeout(2000);
    
  }

  async function getText(page, selector){
    const text = await page.$$eval(selector, texts => texts.map( text => text.innerText));    
    await page.waitForTimeout(2500);
    return text
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(envs.teamUrl);  

  for (let session = 1; session <= envs.amountSession; session++) {
    await part(page,envs.teamId, session)
    await page.waitForTimeout(4000);
    const team = await getText(page, '#pjax-container > div:nth-child(2) > div > div > div.teamInfo > h1')
    const home = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-right.BR0 a');  
    const away = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-left a');
    const scores = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.red-color')
    const corners = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.blue-color')
    const date = await getText(page, '#ended .live-list-table.diary-table tbody tr td:nth-child(2)')
    const odds = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center a[rel]')
  
    fs.writeFile(`${__dirname}/../data/${team[0].replace(' ', '').trim()}${session}.json`, JSON.stringify({team: team[0], home,  away,  scores,  corners,  date, odds}, null, 2), err => {
      if(err) throw new Error(err)
      console.log(`Generated JSON: ../data/${team[0].trim().replace(' ', '')}${session}.json `);
  
    })
  }

  // await page.screenshot({path: 'buddy-screenshot.png'})

  await browser.close();
}

start()