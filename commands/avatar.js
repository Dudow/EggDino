const Discord = require("discord.js")

module.exports = {
  commands: 'avatar',
  expectedArgs: '',
  minArgs: 0,
  maxArgs: null,
  callback: (msg, arguments, text, client) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(`${msg.author.username}'s' avatar:`)
      .setImage(msg.author.displayAvatarURL())
      .setURL(msg.author.displayAvatarURL())

    msg.channel.send(embed)
  },
}



