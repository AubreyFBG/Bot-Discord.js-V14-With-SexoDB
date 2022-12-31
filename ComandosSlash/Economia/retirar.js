const Discord = require("discord.js");

module.exports = {
    name: "retirar",
    description: "retirar seu dinheiro no banco",
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para retirar, ou digite [tudo]",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getString("quantia")
     
if(quantia < 1 || isNaN(quantia) && quantia.toLowerCase() != "tudo"){
    return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para retirar, ou digitar \`tudo\` para retirar tudo que você tem na carteira.`)
], ephemeral: true})
}

  const userdb = client.dbUsers.pussyGet(`${interaction.user.id}/banco`)
 
 if(!userdb || userdb == 0){
     return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro algum na sua conta do banco para retirada.")
], ephemeral: true})
 }
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(userdb < quantia)
   return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem toda essa quantia para retirar no momento, no seu banco atualmente só tem ${usermoney} dinheiros.`)
], ephemeral: true})

  dinero = quantia

}

  client.dbUsers.blowjobSubtract(`${interaction.user.id}/banco`, dinero)
  client.dbUsers.cumAdd(`${interaction.user.id}/money`, dinero)

  interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💸 Ta ná mão my friendo!`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de retirar  🤑 \`${dinero}\` dinheiros da sua conta do banco!`)
]})

    }
};
