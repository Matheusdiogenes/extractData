const fs = require('fs')
const prog = require('./prognostico/getCantos')

const args = process.argv.slice(2)
const teamName = args[0]
const TEAM = teamName.replace('.', ' ')

function cantos(){
  const c = prog.getCantos()
  const c5 = prog.getCantosLast5()
  const mediaCasa = c.cantosCasa[0]/c.jogosCasa + c.cantosCasa[1]/c.jogosCasa
  const mediaFora = c.cantosFora[0]/c.jogosFora + c.cantosFora[1]/c.jogosFora
  const mediaCasa5 = c5.cantosCasa[0]/c5.jogosCasa + c5.cantosCasa[1]/c5.jogosCasa
  const mediaFora5 = c5.cantosFora[0]/c5.jogosFora + c5.cantosFora[1]/c5.jogosFora
  return (
  `${TEAM}: 
  (CASA) ${c.jogosCasa} jogos | Media: ${mediaCasa.toFixed(1)} | Feitos: ${(c.cantosCasa[0]/c.jogosCasa).toFixed(1)} | Sofridos: ${(c.cantosCasa[1]/c.jogosCasa).toFixed(1)}
  (CASA) ${c5.jogosCasa5} jogos | Media: ${mediaCasa5.toFixed(1)} | Feitos: ${(c5.cantosCasa5[0]/c5.jogosCasa5).toFixed(1)} | Sofridos: ${(c5.cantosCasa5[1]/c5.jogosCasa5).toFixed(1)}
  (FORA) ${c.jogosFora} jogos | Media: ${mediaFora.toFixed(1)} | Feitos: ${(c.cantosFora[0]/c.jogosFora).toFixed(1)} | Sofridos: ${(c.cantosFora[1]/c.jogosCasa).toFixed(1)}
  (FORA) ${c5.jogosFora5} jogos | Media: ${mediaFora5.toFixed(1)} | Feitos: ${(c5.cantosFora5[0]/c5.jogosFora5).toFixed(1)} | Sofridos: ${(c5.cantosFora5[1]/c5.jogosCasa5).toFixed(1)}  `
  )
}

const canto = cantos()

fs.appendFileSync(`analiseCantos.txt`, `${canto}\n` , function (err) {
  if (err) return console.log(err);
  console.log('data > analiseCantos.txt');
});