require('dotenv').config()
const puppeteer = require('puppeteer');
const fs = require('fs')

const args = process.argv.slice(2)
const nameJson = args[0]
const amountGame = args[1]

async function start (session){
    
  async function part(page, numberPart){    
    await page.setViewport({ width: 1366, height: 10000 })      
    await page.select('select#pager_select', `/team/${process.env.TEAM_ID}/p.${numberPart}?type=ended_race`)      
    await page.waitForSelector('#pager_select') 
    await page.waitForTimeout(3000);
    
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
  const odds = await getText(page, '#ended .live-list-table.diary-table tbody tr td.text-center a[rel]')

  fs.writeFile(`${__dirname}/../data/${nameJson}${session}.json`, JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date, odds: odds}, null, 2), err => {
    if(err) throw new Error(err)
    console.log(`Generated JSON: ../data/${nameJson}${session}.json `);

  })

  await browser.close();
}

async function load(){
  for (let page = 1; page <= amountGame; page++) {
    await start(page)
    // console.log(page);    
  }
}
load()
