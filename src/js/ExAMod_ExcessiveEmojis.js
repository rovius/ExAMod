// ExAMod by rovius
// https://github.com/rovius/ExAMod
// Excessive emojis filter

// Define your configuration (replace with actual values)
const config = {
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    maxEmojis: 5,
    violationMessage: `<@${member.user.id}>\nExcessive emoji usage detected. Your message has been deleted.`,
}

async function handleViolation(messageId, channelId, violationMessage) {
    await deleteMessage(channelId, messageId)
    await sendMessage(channelId, { content: violationMessage.toString() })
}

// Check if a message should be ignored in the first place
if (
    config.ignoredChannels.includes(channel.id) ||
    config.ignoredMembers.includes(member.user.id) ||
    (config.ignoreAdmins && member.permissions.includes('ADMINISTRATOR'))
) {
    return
}

// Use a regular expression to find emojis in the message
const emojiPattern = /<a?:.+?:\d{18,19}>|\p{Extended_Pictographic}/gu

// Count the number of emojis in the message
const emojiCount = (message.content.match(emojiPattern) || []).length

if (emojiCount > config.maxEmojis) {
    // Excessive emojis detected, handle accordingly
    await handleViolation(message.id, channel.id, config.violationMessage)
}
