const fs = require('fs')
const prog = require('./prognostico/getCantos')

const args = process.argv.slice(2)
const teamName = args[0]


function cantos(){
  const c = prog.getCantos()
  const mediaCasa = c.cantosCasa[0]/c.jogosCasa + c.cantosCasa[1]/c.jogosCasa
  const mediaFora = c.cantosFora[0]/c.jogosFora + c.cantosFora[1]/c.jogosFora
  return (
  `${teamName}: 
  (CASA) ${c.jogosCasa} jogos | Media: ${mediaCasa.toFixed(1)} | Feitos: ${(c.cantosCasa[0]/c.jogosCasa).toFixed(1)} | Sofridos: ${(c.cantosCasa[1]/c.jogosCasa).toFixed(1)}
  (FORA) ${c.jogosFora} jogos | Media: ${mediaFora.toFixed(1)} | Feitos: ${(c.cantosFora[0]/c.jogosFora).toFixed(1)} | Sofridos: ${(c.cantosFora[1]/c.jogosCasa).toFixed(1)}`
  )
}

const canto = cantos()

fs.appendFileSync(`analise.txt`, `${canto}\n` , function (err) {
  if (err) return console.log(err);
  console.log('data > analise.txt');
});