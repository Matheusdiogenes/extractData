require('dotenv').config()
const puppeteer = require('puppeteer');
const fs = require('fs')

async function start (){
  
  async function getText(page, selector){
    const text = await page.$$eval(selector, texts => texts.map( text => text.innerText));    
    return text
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.URL);
  
  const home = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-right.BR0 a');
  const away = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-left a');
  const scores = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.red-color')
  const corners = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td.text-center.blue-color')
  const date = await getText(page, 'section#ended table.live-list-table.diary-table tbody tr td:nth-child(2)')

  fs.writeFile('data.json', JSON.stringify({home: home, away: away, scores: scores, corners: corners, date: date}, null, 2), err => {
    if(err) throw new Error('ERROR')
    console.log('Done');

  })

  await browser.close();
}

start()