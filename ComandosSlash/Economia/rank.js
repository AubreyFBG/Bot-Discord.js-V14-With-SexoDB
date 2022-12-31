const Discord = require("discord.js");

module.exports = {
    name: "rank",
    description: "rank dos maiores dinheiros",
    run: async (client, interaction) => {
     
     let usersdb = client.dbUsers.lustAll().filter(value => value[0].endsWith("money"))
     
     usersdb = usersdb.map(user => {
       const userID = user[0].split("/")[0]
       const banco = client.dbUsers.lustAll().filter(value => value[0].startsWith(userID) && value[0].endsWith("banco") ).flat()
       return {
       userID,
       money: user[1] + (banco[1] ?? 0)
     }
     })
      usersdb.sort((a,b) => b.money - a.money)
      
     interaction.reply({embeds: [new Discord.EmbedBuilder()
     .setTitle(`📊 • Rank dos mais ricos da Economia!`)
     .setColor("a5d7ff")
     .setDescription(`> ${usersdb.map((user, i) => `#${++i} | 👥 **${client.users.cache.get(user.userID) || `sumido#0000`}** (💸${abreviar(user.money)})`).join("\n> ")}`)
          ]})

    }
}

 function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
 }