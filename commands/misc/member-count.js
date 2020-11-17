// module.exports = client => {
//   const channelId = '774683948893732878'

//   const updateMembers = guild => {
//     const channel = guild.channels.cache.get(channelId)
//     channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
//   }
  
//   client.on('guildMemberAdd', member => updateMembers(member.guild))
//   client.on('guildMemberRemove', member => updateMembers(member.guild))

//   const guild = client.guilds.cache.get('345702067643482124')
//   updateMembers(guild)
// }