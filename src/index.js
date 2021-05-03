require('dotenv').config()
const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const fs = require('fs')

const nameJson = readlineSync.question('Generated JSON (data/json/): ') || 'data';
const session = readlineSync.question('Session: ') || 1;

async function start (){
    
  async function part(page, numberPart){    
    await page.setViewport({ width: 1366, height: 10000 })      
    await page.select('select#pager_select', `/team/${process.env.TEAM_ID}/p.${numberPart}?type=ended_race`)      
    await page.waitForSelector('#pager_select') 
    
  }

  async function getText(page, selector){
    const text = await page.$$eval(selector, texts => texts.map( text => text.innerText));    
    return text
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.URL);  

  await part(page, session)
  // await page.screenshot({path: 'buddy-screenshot.png'})
  
  const home = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-right.BR0 a');  
  const away = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-left a');
  const scores = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.red-color')
  const corners = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center.blue-color')
  const date = await getText(page, '#ended .live-list-table.diary-table tbody tr td:nth-child(2)')

  fs.writeFile(`${__dirname}/../data/json/${nameJson}.json`, JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date}, null, 2), err => {
    if(err) throw new Error('Cannot find mudole')
    console.log(`Generated JSON: ../data/json/${nameJson}.json `);

  })

  await browser.close();
}
start()