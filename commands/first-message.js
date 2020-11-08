const addReact = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if(reactions.length > 0){
    setTimeout(() => addReact(message, reactions), 750)
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id)

  channel.messages.fetch().then(messages => {
    if(messages.size === 0){
      channel.send(text).then(msg => {
        addReact(msg, reactions)
      })
    }else{
      for(const message of messages){
        message[1].edit(text)
        addReact(message[1], reactions)
      }
    }
  })
}
