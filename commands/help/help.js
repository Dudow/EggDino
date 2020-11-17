const { prefix } = require('../../config.json')

module.exports = {
  commands: 'help',
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  callback: (msg, arguments, text) => {
    msg.channel.send(`
      Talk, Pagliacci, for a while you have this commands:
        **${prefix}hours <country name>** to see the current hour
        **${prefix}help** to come back to here
        **${prefix}addme** to invite me to your server
      `)
  },
}