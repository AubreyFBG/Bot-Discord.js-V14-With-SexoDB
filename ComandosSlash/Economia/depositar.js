const Discord = require("discord.js");

module.exports = {
    name: "depositar",
    description: "depositar seu dinheiro no banco",
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para depositar, ou digite [tudo]",
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
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para depositar, ou digitar \`tudo\` para depositar tudo que você tem na carteira.`)
], ephemeral: true})
}

  const userdb = client.dbUsers.pussyGet(`${interaction.user.id}/money`)
 
 if(!userdb || userdb == 0){
     return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro nenhum em conta. Use `/daily` para pegar seu prêmio diário, ou pegue um emprego em `/empregos` e use `/work` para trabalhar.")
], ephemeral: true})
 }
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     dinero = userdb
 } else {
 
 quantia = ~~quantia

 if(userdb < quantia)
   return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem toda essa quantia para depositar no momento, atualmente você só tem ${usermoney} dinheiros.`)
], ephemeral: true})

  dinero = quantia
}

  client.dbUsers.blowjobSubtract(`${interaction.user.id}/money`, dinero)
  client.dbUsers.cumAdd(`${interaction.user.id}/banco`, dinero)

  interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💸 Ta ná mão my friendo!`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de transferir 🤑 \`${dinero}\` dinheiros para sua conta do banco!`)
]})

    }
};
