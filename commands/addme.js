const { prefix } = require('../../config.json')
const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = {
  commands: 'addme',
  expectedArgs: '',
  minArgs: 0,
  maxArgs: null,
  callback: (msg, arguments, text) => {
    const logo = 'https://i.imgur.com/tqFQcPy.jpg'

    const embed = new Discord.MessageEmbed()
      .setTitle('Click here')
      .setURL('https://discord.com/oauth2/authorize?client_id=772102488005935114&scope=bot&permissions=3145')
      .setAuthor(`${msg.author.username}, to invite me to your server `)
      .setThumbnail(logo)
      .setColor('#00AAFF')

    msg.reply(embed)
  },
}
      