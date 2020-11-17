const express = require('express')
const app = express()
const Discord = require("discord.js")
const client = new Discord.Client()
const moment = require('moment'); 
const path = require('path')
const fs = require('fs')

const config = require("./config.json")

const {prefix} = config

app.get("/", (req, res) => {
  const ping = new Date()
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
  res.sendStatus(200)
})
app.listen(process.env.PORT)

function regexx(word){
  var r=word.content.toLowerCase();
  r = r.replace(new RegExp(/\s/g),"");
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  r = r.replace(new RegExp(/\W/g),"");

  return r;
}

// https://www.youtube.com/watch?v=qpgTC9MDx1o&list=RDqpgTC9MDx1o&start_radio=1&t=0

client.on("ready", () => {
  const activities = [
    {
      text: 'Monogatari Series',
      type: 'WATCHING'
    },
    {
      text: 'indian music',
      type: 'LISTENING'
    },
    {
      text: 'this bot life',
      type: 'PLAYING'
    },
    // {
    //   text: 'Monogatari',
    //   type: 'WATCHING'
    // }
  ]
  let i = 0
  setInterval(() => {
    client.user.setActivity(`${activities[i % activities.length].text}`, {
      type: `${activities[i++ % activities.length].type}`
    })
  }, 600000)
})

client.on('ready', async () => {
  const basefile = 'command-base.js'
  const commandBase = require(`./commands/${basefile}`)

  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for(const file of files){
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if(stat.isDirectory()){
        readCommands(path.join(dir, file))
      } else if(file !== basefile){
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
})



client.on('message', msg => {

  let r = regexx(msg); 

  const regex = /(\W|^)(ab|abzinha|ana\s?barbara|ana\s?barbara)(\W|$)/gi;

  if(r.match(regex))
  {
    msg.reply(`DELETE THIS`);
  }
});

client.on('message', msg => {

  let r = regexx(msg)

  const regex = /(\W|^)(good\s?night|goodnight|tchau|goodbye|bye)(\W|$)/gi;

  if(r.match(regex))
  {
    if(msg.author.id === '317060282784546827'){
      msg.reply(`I will be waiting... work on my bugs... lazy boy`);
    }else if(msg.author.id === '690069120104005663'){
      msg.reply(`bye bye, princess`);
    }else if(msg.author.id === '454780516395122709'){
      msg.reply(`IRMÃO... goodbye`);
    }else if(msg.author.id === '347484454954074112'){
      msg.reply(`go to hell 😈`);
    }else if(msg.author.id === '677549967191048274'){
      msg.reply(`oh... you? here?`);
    }else{
      msg.reply(`cyaaaaaaa`);
    }
  }
});

client.login(process.env.TOKEN)