// ExAMod by rovius
// https://github.com/rovius/ExAMod
// Repeated messages filter

// Define your configuration (replace with actual values)
const config = {
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Repeated messages detected. Please refrain from spamming.`,
    maxMessages: 5,
    timeThreshold: 5000,
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

// Retrieve the user's message history
const userKey = `${guild.id}.${member.user.id}.plugins.examod`
const userMessages = (await getValue(`${userKey}.messages`)) || []
const consecutiveRepeatedCount =
    (await getValue(`${userKey}.consecutiveRepeatedCount`)) || 0

// Get the current timestamp
const currentTimestamp = message.createdTimestamp

// Filter messages within the time threshold
const recentMessages = userMessages.filter((msg) => {
    return currentTimestamp - msg.timestamp < config.timeThreshold
})

// Check if the current message is repeated by comparing with the last message in the history
const isRepeated =
    userMessages.length > 0 &&
    userMessages[userMessages.length - 1].content === message.content

// If the message is repeated, increment the count
if (isRepeated) {
    await setValue(
        `${userKey}.consecutiveRepeatedCount`,
        consecutiveRepeatedCount + 1
    )

    // If the count exceeds the limit, take action
    if (consecutiveRepeatedCount >= config.maxMessages) {
        await handleViolation(message.id, channel.id, config.violationMessage)

        // Clear the user's message history and reset the count
        await setValue(`${userKey}.messages`, [])
        await deleteValue(`${userKey}.consecutiveRepeatedCount`)
    }

    return
}

// If the current message is not repeated, reset the count
await deleteValue(`${userKey}.consecutiveRepeatedCount`)

// Update the user's message history with the current message
userMessages.push({
    content: message.content,
    timestamp: currentTimestamp,
})

// Check if the array size exceeds maxMessages and there are no consecutive repeated messages and no violations
if (
    userMessages.length > config.maxMessages &&
    consecutiveRepeatedCount === 0
) {
    // Remove the oldest messages to keep the array within the limit
    const messagesToRemove = userMessages.length - config.maxMessages
    userMessages.splice(0, messagesToRemove)

    // Update the user's message history with the cleaned array
    await setValue(`${userKey}.messages`, userMessages)
} else {
    // Store the updated message history
    await setValue(`${userKey}.messages`, userMessages)
}
