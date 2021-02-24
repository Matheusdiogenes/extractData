require('dotenv').config()
const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const fs = require('fs')

const nameJson = readlineSync.question('Generated JSON (data/json/): ') || 'data';
const resultsPage = readlineSync.question('Results Page (default = 1):  ') || 1;

async function start (){
  
  async function part(page, numberPart){
    const part = numberPart || '1'
    await page.setViewport({ width: 1366, height: 1000 })  
    
    await page.select('#panel-1 > #ended #pager_select', `/league/${process.env.LEAGUE_ID}/p.${part}?type=ended_race`)  
    await page.waitForSelector('#panel-1 > #ended #pager_select')
    await page.waitForTimeout(3000)
    await page.click('#panel-1 > #ended #pager_select')  
  }

  async function getText(page, selector){
    const text = await page.$$eval(selector, texts => texts.map( text => text.innerText));    
    return text
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.URL);  

  await part(page, resultsPage)
  
  
  const home = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-right.BR0 a');
  const away = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-left a');
  const scores = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.red-color')
  const corners = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.blue-color')
  const date = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td:nth-child(2)')

  fs.writeFile(`${__dirname}/../data/json/${nameJson}.json`, JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date}, null, 2), err => {
    if(err) throw new Error('Cannot find mudole')
    console.log(`Generated JSON: ../data/json/${nameJson}.json `);

  })

  await browser.close();
}
start()