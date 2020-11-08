module.exports = client => {

  const addReactions = message => {
    message.react('😈')
    message.react('😇')
  }

  client.on('message', async msg => {
    if(msg.content.toLowerCase() === '//poll'){
      await msg.delete()

      const fetched = await msg.channel.messages.fetch({
        limit: 1
      })

      if(fetched && fetched.first()){
        addReactions(fetched.first())
      }
    }
  })
}