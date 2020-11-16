const express = require('express')
const app = express()
const Discord = require("discord.js")
const client = new Discord.Client()
const moment = require('moment'); 

const config = require("./config.json")

const mongo = require("./db/mongo")
const command = require('./commands/commands.js')
const privateMessage = require('./commands/private')
const poll = require('./commands/poll')
const hours = require('./commands/hours')
const memberCount = require('./commands/member-count')
const welcome = require('./commands/welcome')
const help = require('./commands/help')
const countMessage = require('./commands/message-counter')
const price = require('./commands/price')
// const firstMessage = require('./commands/first-message')
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

client.on('ready', async () => {
  // firstMessage(client, '345702068201193483', 'hi boy', ['🥛'])

  await mongo().then(mongoose => {
    try{
      console.log('Connected to mongo!')
    } catch (e) {
      console.log(e)
    }
  })

  // privateMessage(client, 'milk', 'DONT DO IT 🥛🔫')
  poll(client)
  hours(client)
  memberCount(client)
  welcome(client)
  help(client)
  countMessage(client)
  price(client)

  command(client, 'ctc', (msg) => {
    const name = msg.content.replace(`${prefix}ctc`, '')

    msg.guild.channels
    .create(name, {
      type: 'text',
    }).then(channel => {
      const categoryId = '772476246550249534'
      channel.setParent(categoryId)
    })
  })

  command(client, 'cvc', (msg) => {
    const name = msg.content.replace(`${prefix}cvc`, '')

    msg.guild.channels
    .create(name, {
      type: 'voice',
    }).then(channel => {
      const categoryId = '772476246550249534'
      channel.setParent(categoryId)
      // channel.setUserLimit(10)
    })
  })

  // EMBED MESSAGES
  // command(client, 'embed', (msg)=> {

  //   const logo = 'https://i.imgur.com/wSTFkRM.png'

  //   const embed = new Discord.MessageEmbed()
  //     .setTitle('example')
  //     .setURL('https://www.youtube.com/watch?v=BvY4Q8APwx0')
  //     .setAuthor(msg.author.username)
  //     .setImage(logo)
  //     .setThumbnail(logo)
  //     .setColor('#00AAFF')
  //     .addFields(
  //       {
  //       name: 'field',
  //       value: 'eae boy',
  //       inline: true
  //       },
  //       {
  //       name: 'field 2',
  //       value: 'eae boy',
  //       inline: true
  //       },
  //       {
  //       name: 'field 3',
  //       value: 'eae boy',
  //       inline: true
  //       },
  //     )

  //   msg.channel.send(embed)
  // })

  command(client, 'serverinfo', msg  =>{
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
  })

  

  command(client, 'addme', (msg) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Click here')
      .setURL('https://discord.com/oauth2/authorize?client_id=772102488005935114&scope=bot&permissions=3145')
      .setAuthor(`${msg.author.username}, to invite me to your server `)

    msg.reply(embed)
  })

  command(client, 'servers', (msg) => {
    client.guilds.cache.forEach((guild) => {
      msg.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
    })
  })
  
  command(client, 'kick', (msg) => {
    const {member, mentions} = msg

    if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
      const target = mentions.users.first()

      if(target){
        const targetMember = msg.guild.members.cache.get(target.id)
        targetMember.kick()
        msg.channel.send(`<@${member.id}>, you did it, not me`)
      }else{
        msg.channel.send(`<@${member.id}>, specify someone to ban`)
      }

    } else{
      msg.channel.send(`<@${member.id}>, you dont have permission to use this command`)
    }
  })

  command(client, 'status', msg => {
    const content = msg.content.replace('//status', '')

    if(msg.channel.type === 'dm'){
      client.user.setPresence({
        activity: {
          name: content,
          type: 0
        }
      })
    }
  })
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