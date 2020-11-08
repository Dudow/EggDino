const mongo = require('../db/mongo')
const command = require('./commands')
const welcomeSchema = require('../schemas/welcome-schema')

module.exports = client => {

  const cache = {}

  command(client, 'setwelcome', async msg => {
    const {member, channel, content, guild} = msg

    if(!member.hasPermission('ADMINISTRATOR')){
      channe.send(`<@${member.id}>, you dont have permission to use this command`)
      return
    }

    let text = content
    const split = text.split(' ')

    cache[guild.id] = [channel.id, text]

    if(split.length < 2){
      channel.send('Please, provide a welcome message')
      return
    }

    split.shift()

    text = split.join(' ')

    await mongo().then(async mongoose => {
      try{
        await welcomeSchema.findOneAndUpdate({
          _id: guild.id,
        }, {
          _id: guild.id,
          channelId: channel.id,
          text: text
        }, {
          upsert: true
        })
      } catch (e) {
        console.log(e)
      }
    })

  })

  const onJoin = async member => {
    const {guild} = member

    let data = cache[guild.id]

    if(!data){
      
      await mongo().then(async mongoose => {
        try{
          const result = await welcomeSchema.findOne({
            _id: guild.id
          })

          cache[guild.id] = data = [result.channelId, result.text]
        } catch (e) {
          console.log(e)
        }
      })
    }

    const channelId = data[0]
    const text = data[1]

    const channel = guild.channels.cache.get(channelId)
    channel.send(text.replace(/<@>/g, `<@${member.id}>`))

  }

  command(client, 'simjoin', message => {
    onJoin(message.member)
  })

  client.on('guildMemberAdd', member => {
    onJoin(member)
  })

}