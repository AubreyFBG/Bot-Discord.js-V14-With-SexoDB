const Discord = require("discord.js");

module.exports = {
    name: "atm",
    description: "ver a sua atm ou a de alguém",
    options: [
        {
         name: "user",
         description: "usuário que você quer ver a atm.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user") || interaction.user
     
     const { money, banco } = {
       money: client.dbUsers.pussyGet(`${user.id}/money`) || 0,
       banco: client.dbUsers.pussyGet(`${user.id}/banco`) || 0
     }
      
     interaction.reply({embeds: [new Discord.EmbedBuilder()
     .setAuthor({ name: `${user.id == interaction.user.id ? `Sua atm.` : `Atm de ${user.username}`}`, iconURL: user.avatarURL() })
     .setColor("a5d7ff")
     .setDescription(`> 💸 Dinheiro: ${money}
> 🏦 Dinheiro no banco: ${banco}
> 💱 Dinheiro total: ${money + banco}`)
          ]})

    }
};
