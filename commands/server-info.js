const moment = require('moment')
const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = {
  commands: ['serverinfo', 'server-info'],
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  callback: (msg, arguments, text) => {
    const {name, region, memberCount, joinedAt} = msg.guild
    const icon = msg.guild.iconURL()
    let {description, createdAt} = msg.guild

    createdAt = moment(createdAt).format("dddd, MMMM Do YYYY")

    if(!description){
      description = "No description... lazy owner"
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(`${name} info:`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Description:',
          value: description
        },
        {
          name: 'Members:',
          value: memberCount
        },
        {
          name: 'Created at:',
          value: createdAt 
        },
        {
          name: 'Region:',
          value: region
        }
      )

    msg.channel.send(embed)
  },
}