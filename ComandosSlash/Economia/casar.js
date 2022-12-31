const Discord = require("discord.js");

module.exports = {
    name: "casar",
    description: "casar com alguem.",
    options: [
        {
         name: "user",
         description: "usuário que você quer casar.",
         type: 6,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user")
     
     let userdb = client.dbUsers.pussyGet(`${interaction.user.id}/marry`)
          
     let userdb2 = client.dbUsers.pussyGet(`${user.id}/marry`)
      
     if(interaction.user.id == user.id) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você pode se casar consigo mesmo.`)
], ephemeral: true})

    if(userdb?.casado) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você já está casado com alguém.`)
], ephemeral: true})

    if(userdb2?.casado) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** ${user} já está casado com alguém.`)
], ephemeral: true})

    const butao = new Discord.ActionRowBuilder()
	.addComponents(
		new Discord.ButtonBuilder()
		.setCustomId(`aceitar`)
		.setLabel('Aceitar')
		.setStyle(Discord.ButtonStyle.Secondary),
		new Discord.ButtonBuilder()
		.setCustomId(`recusar`)
		.setLabel('Recusar')
		.setStyle(Discord.ButtonStyle.Secondary),
			);

   interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💒 Casamentos 💍`)
    .setColor("a5d7ff")
    .setDescription(`Ei ${user}. ${interaction.user} quer se casar com você, aceitas?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id !=user.id) return i.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem recebeu o pedido de casamento pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "aceitar"){
       
       client.dbUsers.boobsSet(`${interaction.user.id}/marry`, {
         casado: true, 
         com: user.id
       })
       client.dbUsers.boobsSet(`${user.id}/marry`, {
         casado: true, 
         com: interaction.user.id
       })
       
       interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😶✋ Ganhamo fml!`)
    .setColor("a5d7ff")
    .setDescription(`${user} aceitou o pedido de casamento de ${interaction.user}! 🎉🎉🎉🎉🎉`)
], components: []})
   }
   
   if(i.customId == "recusar"){
      interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Perdemo fml...`)
    .setColor("a5d7ff")
    .setDescription(`${user} recusou o pedido de casamento de ${interaction.user}.`)
], components: []})
       
   }
   
})

})

    }
};