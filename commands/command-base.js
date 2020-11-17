const { prefix } = require('../config.json')

const validatePermissions = permissions => {
  const validPermission = [
    'ADMINISTRATOR',
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS'
  ]

  for (const permission of permissions){
    if(!validPermission.includes(permission)){
      throw new Error('Without Permission')
    }
  }
}

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = '',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    callback
  } = commandOptions

  if(typeof commands === 'string'){
    commands = [commands]
  }

  if(permissions.length){
    if(typeof permissions === 'string'){
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  client.on('message', msg => {
    const {member, guild, content} = msg

    // console.log(commands)

    if(commands){
      for(const alias of commands){
        if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)){
          
          for(const permission of permissions){
            if(!member.hasPermission(permission)){
              msg.reply(permissionError)
              return
            }
          }

          const arguments = content.split(/[ ]+/)
          arguments.shift()

          if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)){
            msg.reply(`Incorrect, boy! Try it: 
              **${prefix}${alias} ${expectedArgs}**
            `)
            return
          }

          callback(msg, arguments, arguments.join(' '), client)
          
          return
        }
      }
    }

  })

} 