const Discord = require("discord.js");

module.exports = {
    name: "daily",
    description: "pegar o daily",
    run: async (client, interaction) => {
     
     let userdb = client.dbUsers.pussyGet(`${interaction.user.id}/daily/cooldown`)
      
    if(Date.now() < userdb){
      const calc = userdb - Date.now()
      
         return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`🤔 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você pegar o daily novamente.`)
], ephemeral: true})
     }  
      
      const dinheiro = Math.floor(Math.random() * 5000) + 5000

    client.dbUsers.boobsSet(`${interaction.user.id}/daily/cooldown`, Date.now() + 86400000)
    client.dbUsers.cumAdd(`${interaction.user.id}/money`, dinheiro)
   
    interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💸 Daily pego! `)
    .setColor("a5d7ff")
    .setDescription(`**Ta na mão chefia!** Você pegou seu prêmio diario e ganhou 🤑 ${dinheiro} dinheiros.`)
]})
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}