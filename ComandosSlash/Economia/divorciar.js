const Discord = require("discord.js");

module.exports = {
    name: "divorciar",
    description: "se divorciar de alguem.",
    run: async (client, interaction) => {
        
     const userdb = client.dbUsers.pussyGet(`${interaction.user.id}/marry`)
          
     if(!userdb || !userdb?.casado){
         return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Calma ae filhão...`)
    .setColor("a5d7ff")
    .setDescription(`Você não está casado com ninguém.`)
], ephemeral: true})
     }

    const butao = new Discord.ActionRowBuilder()
	.addComponents(
		new Discord.ButtonBuilder()
		.setCustomId(`sim`)
		.setLabel('Sim')
		.setStyle(Discord.ButtonStyle.Secondary),
		new Discord.ButtonBuilder()
		.setCustomId(`nao`)
		.setLabel('Não')
		.setStyle(Discord.ButtonStyle.Secondary),
			);

   const casado = await client.users.fetch(userdb.com)

   interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`Divórcio 💔`)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user}, tem certeza que deseja se divorciar de ${casado.username}?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o comando pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "sim"){
       
       client.dbUsers.boobsSet(`${interaction.user.id}/marry`, {
         casado: false
       })
       client.dbUsers.boobsSet(`${casado.id}/marry`, {
         casado: false
       })
       
       interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💔 Pelo visto o amor acabou...`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de se divorciar de ${casado.username}.`)
], components: []})
   }
   
   if(i.customId == "nao"){
      interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😶 A vida continua...`)
    .setColor("a5d7ff")
    .setDescription(`O divórcio foi cancelado.`)
], components: []})
       
   }
   
})

})

    }
};