// ExAMod by rovius
// https://github.com/rovius/ExAMod
// Excessive mentions filter

// Define your configuration (replace with actual values)
const config = {
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Your message has too many mentions. Keep it concise.`,
    checkEveryone: true,
    checkMembers: true,
    checkRoles: false,
    maxMentions: 3,
}

async function handleViolation(messageId, channelId, violationMessage) {
    await deleteMessage(channelId, messageId)
    await sendMessage(channelId, { content: violationMessage.toString() })
}

// Total in-message mentions
let mentions = 0

// Check if a message should be ignored in the first place
if (
    config.ignoredChannels.includes(channel.id) ||
    config.ignoredMembers.includes(member.user.id) ||
    (config.ignoreAdmins && member.permissions.includes('ADMINISTRATOR'))
) {
    return
}

// If checkEveryone is enabled, instantly count a violation
if (config.checkEveryone && message.mentions.everyone) {
    await handleViolation(message.id, channel.id, config.violationMessage)
    return
}

// If checkMembers is enabled, add member mentions to overall mentions count
if (config.checkMembers) {
    mentions += message.mentions.members.length
}

// If checkRoles is enabled, add role mentions to overall mentions count
if (config.checkRoles) {
    mentions += message.mentions.roles.length
}

if (mentions > config.maxMentions) {
    // Excessive mentions detected, handle accordingly
    await handleViolation(message.id, channel.id, config.violationMessage)
}
