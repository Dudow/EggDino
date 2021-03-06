const { prefix } = require('../../config.json')

module.exports = {
  commands: 'ctc',
  expectedArgs: '<channel-name>',
  minArgs: 1,
  maxArgs: 1,
  callback: (msg, arguments, text) => {
    const split = msg.content.split(/[ ]+/)
    const name = split[1]

    msg.guild.channels
    .create(name, {
      type: 'text',
    }).then(channel => {
      const categoryId = '772476246550249534'
      channel.setParent(categoryId)
    })
  },
}