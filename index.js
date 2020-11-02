const express = require('express')
const app = express()

const moment = require('moment'); 

app.get("/", (req, res) => {
  const ping = new Date()
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
  res.sendStatus(200)
})
app.listen(process.env.PORT)

const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

client.on("message", msg => {
  if(msg.author.bot) return
  // if(msg.channel.type == "dm") return
  if(!msg.content.toLowerCase().startsWith(config.prefix)) return
  if(msg.content.startsWith(`<@!${client.user.id}>`) ||
  msg.content.startsWith(`<@${client.user.id}>`)) return

  const args = msg.content.trim().slice(config.prefix.lenght).split(/ +/g)
  const command = args.shift().toLowerCase()

  try{
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, msg, args)
  } catch(err){
    console.log("Erro: " + err)
  }
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content === '//help') {
    msg.reply(`
      Talk, Pagliacci, for a while you have this commands:
        //hours to see the current hours in all the countries
        //help to come back to here
        //addme to invite me to your server
    `);
  }
});

client.on('message', msg => {
  if (msg.content === '//ajuda') {
    msg.reply(`
      Fala comédia, por enquanto você tem os comandos:
        //horas para conferir o horário atual em DIVERSOS países
        //ajuda pra voltar pra cá
        //addme pra me colocar no seu server
    `);
  }
});

client.on('message', msg => {
  if (msg.content === '//addme') {

    msg.reply(`
      Use this link: https://discord.com/oauth2/authorize?client_id=772102488005935114&scope=bot&permissions=3145
    `);
  }
});

client.on('message', msg => {

  const regex = /(\W|^)(ab|abzinha|ana\s?barbara|ana\s?barbara)(\W|$)/gi;

  if(msg.content.match(regex))
  {
    msg.reply(`O SEU FILHO DA PUTA, SE MATA AGORA`);
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