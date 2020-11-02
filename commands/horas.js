const Discord = require("discord.js")
const moment = require('moment'); 

module.exports.run = async (client, msg, args) => {

  const author =  msg.author.username;

  if (msg.content === '//horas') {
    let hours = new Date();
    hours = moment(hours)

    let indiaHours = hours
    indiaHours = moment(indiaHours).add(5, 'hours').add(30, 'minutes').format("HH:mm")

    let brazilHours = hours
    brazilHours = moment(brazilHours).subtract(3, 'hours').format("HH:mm")

    msg.reply(`
      ${author}
      Brasil: ${brazilHours}
      India: ${indiaHours}
    `);
  };
}