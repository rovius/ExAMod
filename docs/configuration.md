# ExAMod Plugin Configuration Guide

## Generic Options

These settings are common to all ExAMod plugin filters, although different values can be set for each specific filter.

1. `ignoredChannels` _array of [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (snowflake)_

    - List of channel IDs to exclude from filtering.

2. `ignoredMembers` _array of [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (snowflake)_

    - List of user IDs whose messages will be ignored.

3. `ignoreAdmins` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_

    - Toggle to filter or allow messages from server administrators.

4. `violationMessage` _[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_
    - Custom message sent when a violation is detected.

## Usage example

```js
{
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Violation message goes here.`,
}
```

## Excessive emojis filter

The Excessive emojis filter aims to curb the spread of excessive emojis in messages on your Discord server.

### Filter options

1. `maxEmojis` _[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)_
    - Number of repeated emojis allowed in a single message.

### Usage example

```js
{
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Emoji spam detected! Keep your messages clean.`,
    maxEmojis: 5,
}
```

## Excessive mentions filter

The Excessive mentions filter is designed to prevent excessive mentions in messages on your Discord server.

### Filter options

1. `checkEveryone` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_

    - Toggle to check for '@everyone' and '@here' mentions.

2. `checkMembers` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_

    - Toggle to check for member mentions.

3. `checkRoles` _[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)_

    - Toggle to check for role mentions.

4. `maxMentions` _[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)_
    - Number of mentions allowed in a single message.

### Usage Example

```js
{
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Your message has too many mentions. Keep it concise.`,
    checkEveryone: true,
    checkMembers: true,
    checkRoles: false,
    maxMentions: 3,
}
```

## Repeated messages filter

The Repeated messages filter identifies and handles repeated messages.

### Filter options

1. `maxMessages` _[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)_

    - Number of repeated messages allowed in a given time period.

2. `timeThreshold` _[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)_
    - Time period (in milliseconds) within which repeated messages are checked.

### Usage Example

```js
{
    ignoredChannels: ['channelID1', 'channelID2'],
    ignoredMembers: ['userID1', 'userID2'],
    ignoreAdmins: false,
    violationMessage: `Repeated messages detected. Please refrain from spamming.`,
    maxMessages: 5,
    timeThreshold: 5000,
}
```
