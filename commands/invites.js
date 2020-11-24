module.exports = {
  commands: 'invites',
  callback: msg => {
    const {guild} = msg

    guild.fetchInvites().then(invites => {
      const inviteCounter = {}

      invites.forEach(invite => {
        const {uses, inviter} = invite
        const {username, discriminator} = inviter

        const name = `${username}#${discriminator}`

        inviteCounter[name] = (inviteCounter[name] || 0) + uses
      })

      let replyText = ''

      for (const invite in inviteCounter){
        const count = inviteCounter[invite]
        replyText += `\n${invite} has invited ${count} member(s)!!`
      }

      msg.reply(replyText)

    })
  }
}