const { prefix } = require('../../config.json')

module.exports = {
  commands: 'kick',
  expectedArgs: '<@user>',
  minArgs: 1,
  maxArgs: null,
  permissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
  callback: async (msg, arguments, text) => {
    const {member, mentions} = msg
    const target = mentions.users.first()
    console.log(target)

    if(target){
      const targetMember = msg.guild.members.cache.get(target.id)
      targetMember.kick()
      msg.channel.send(`<@${member.id}>, you did it, not me`)
    }
  },
}