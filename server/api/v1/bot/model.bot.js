const botId = "65a89c23e6eb0a160a17b787"

const isBot = (id) => { return botId === id ? true : false }

const checkBot = (arr) => { return arr.find(e => e.id === botId).length > 0 ? true : false }

module.exports = {
    botId,
    isBot
}