require('dotenv').config()

const teamUrl = process.env.TEAM_URL
const amountSession = process.env.AMOUNT_SESSION

const urlSplit = teamUrl.split('/')
const teamId = urlSplit[urlSplit.length - 1]

console.log(teamUrl);
console.log(teamId);

module.exports = {
  teamUrl,
  teamId,
  amountSession

}