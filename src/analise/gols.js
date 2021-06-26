const fs = require('fs')
const prog = require('./prognostico/getGols')
const args = process.argv.slice(2)
const handicapInitial = args[1]
const teamName = args[0]


function matchOddsFavorito(){
  const mof = prog.getMatchOddsFavorito(handicapInitial)  
  return (
  `O ${teamName} jogando em casa com Handicap Initial de ${handicapInitial} (${mof.jogosCasa} jogos):
  Vitorias: ${mof.vitoriasCasa} - Empates: ${mof.empatesCasa} - Derrotas: ${mof.derrotasCasa}  
  
  O ${teamName} jogando fora com Handicap Initial de ${handicapInitial} (${mof.jogosFora} jogos):
  Vitorias: ${mof.vitoriasFora} - Empates: ${mof.empatesFora} - Derrotas: ${mof.derrotasFora}  `
  )
}

function matchOdds(){
  const mo = prog.getMatchOdds()  
  return `${mo.jogosCasa}`

}

// matchOddsFavorito()
const m = matchOddsFavorito()
fs.appendFileSync(`analise.txt`, `${m}\n` , function (err) {
  if (err) return console.log(err);
  console.log('data > analise.txt');
});
