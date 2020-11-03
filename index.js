const express = require('express')
const app = express()
const Discord = require("discord.js")
const client = new Discord.Client()
const moment = require('moment'); 

const command = require('./commands/commands.js')

const config = require("./config.json")
app.get("/", (req, res) => {
  const ping = new Date()
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
  res.sendStatus(200)
})
app.listen(process.env.PORT)


client.on('ready', () => {
  command(client, 'ping', (msg) => {
    msg.channel.send('pong')
  })

  command(client, 'ajuda', (msg) => {
    msg.channel.send(`Fala comédia, por enquanto você tem os comandos:
        //horas para conferir o horário atual em DIVERSOS países
        //ajuda pra voltar pra cá
        //addme pra me colocar no seu server`)
  })

  command(client, ['hours', 'horas'], (msg) => {
    let indiaHours = moment(new Date()).add(5, 'hours').add(30, 'minutes').format("HH:mm")
    let brazilHours = moment(new Date()).subtract(3, 'hours').format("HH:mm")

    msg.channel.send(`Brazil: ${brazilHours} `)
    msg.channel.send(`India: ${indiaHours}`)
  })

  command(client, 'help', (msg) => {
    msg.channel.send(`
      Talk, Pagliacci, for a while you have this commands:
        //hours to see the current hours in all the countries
        //help to come back to here
        //addme to invite me to your server
    `)
  })

  command(client, 'addme', (msg) => {
    msg.channel.send(`
      Use this link: https://discord.com/oauth2/authorize?client_id=772102488005935114&scope=bot&permissions=3145
    `)
  })
})

client.on('message', msg => {

  const regex = /(\W|^)(ab|abzinha|ana\s?barbara|ana\s?barbara)(\W|$)/gi;

  if(msg.content.match(regex))
  {
    msg.reply(`DELETE THIS`);
  }
});

client.on('message', msg => {
  const regex = /(\W|^)(good\s?night|goodnight|tchau|goodbye|bye)(\W|$)/gi;

  if(msg.content.match(regex))
  {
    msg.reply(`cyaaa, boss`);
  }
});

client.login(process.env.TOKEN)