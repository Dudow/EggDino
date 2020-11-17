const { prefix } = require('../../config.json')

module.exports = {
  commands: 'poll',
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  callback: async (msg, arguments, text) => {
    await msg.delete()

    const fetched = await msg.channel.messages.fetch({
      limit: 1
    })

    if(fetched && fetched.first()){
      addReactions(fetched.first())
    }
  },
}

const addReactions = message => {
  message.react('😈')
  message.react('😇')
}