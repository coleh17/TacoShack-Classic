const shacks = require("../../schemas/shacks.js");

module.exports.run = async (bot, message, args, funcs, prefix) => {
    shacks.findOne({ userID: message.author.id }, async (err, data) => {
        if (err) {
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${prefix}found\` to found your shop!`)
            return
        } else if (data) {

            if (data.work > Date.now() && data.work) {
                message.channel.send(`Chill... Don't overwork yourself!`)
                return;
            }
            var tacos = Math.floor(Math.random() * (30 - 5)) + 5;
            var money = Math.floor(Math.random() * (100 - 20)) + 20;
            data.work = Date.now() + 600000
            data.balance += money
            data.tacos += tacos
            data.save().catch(err => console.log(err))

            return message.channel.send(`💵 You cooked **${tacos}** tacos and earned **$${money}** while working!`)
        }
    })
}

module.exports.help = {
    name: "work",
    aliases: ["cook"]
}