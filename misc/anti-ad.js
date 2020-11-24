module.exports = client => {

  const isInvite = async (guild, code) => {
    return await new Promise(resolve => {
      guild.fetchInvites().then(invites => {
        for(const invite of invites){
          if(code === invite[0]){
            resolve(true)
            return
          }
        }
        resolve(false)
      })
    })
  }

  client.on('message', async msg => {
    const {guild, member, content} = msg

    const code = content.split('discord.gg/')[1] 

    if(content.includes('discord.gg/')){
      const isOurInvite = await isInvite(guild, code)
      console.log(isOurInvite)
      if(!isOurInvite){
        const serverId = '345702067643482124'
        const canalId = '345702068201193483'

        const canal = client.guilds.cache.get(serverId).channels.cache.get(canalId);

        if(msg.channel.id !== canalId){

          canal.send(`${msg.author} sent: ${msg}`)

          msg.channel.send(`Your invite was moved to ${canal}`)
          await msg.delete()
        }
      }
    }
  })
}

    

    