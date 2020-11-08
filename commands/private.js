module.exports = (client, triggerText, replyText) => {

  client.on('message', message => {
    if(message.content.toLowerCase().includes(triggerText.toLowerCase())){
      message.author.send(replyText)
    }
  })
  
}