const Discord = require("discord.js");

module.exports = {
    name: "work",
    description: "trabalhar",
    run: async (client, interaction) => {
     
     let userdb = client.dbUsers.pussyGet(`${interaction.user.id}/trabalho`)
      
     if(!userdb || !userdb.trampo){
         return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Dá não filhão...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você ainda não tem um emprego, digite /empregos para ver a lista de empregos e escolher algum.`)
], ephemeral: true})
     }
      
     let cooldown = client.dbUsers.pussyGet(`${interaction.user.id}/trabalho/cooldown`)
      
    if(Date.now() < cooldown){
      const calc = cooldown - Date.now()
      
         return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`🤔 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você trabalhar novamente.`)
], ephemeral: true})
     }  
      
    let frase,
        emprego;
          
    switch (userdb.trampo){
      
  case "lixeiro":
    emprego = "🗑️ lixeiro"
    frase = ["juntou 20 sacos lixos", "dirigiu o caminhão de lixo por 2 horas"]
  break;
  
  case "pizza":
    emprego = "🍕 entregador de pizza"
    frase = ["entregou 8 pizzas", "trabalhou por 3 horas"]
  break;
  
  case "frentista":
    emprego = "⛽ frentista"
    frase = ["abasteceu 28 carros", "trocou o óleo de 8 caminhões"]
  break;
  
  case "caminhoneiro":
    emprego = "🚛 caminhoneiro"
    frase = ["uma carga de Rondônia levou até Porto velho", "fez 2 entregas em 1 dia"]
  break;
  
  case "sedex":
    emprego = "📦 entregador do sedex"
    frase = ["entegou 20 pacotes"]
  break;
  
  case "pescador":
    emprego = "🎣 pescador"
    frase = ["pescou 20 bagres", "pescou um peixe lendário no laguinho do seu Zé"]
  break;
  
  case "ti":
    emprego = "💻 técnico de ti"
    frase = ["arrumou 7 computadores de pessoas que clicaram em mães solteias", "desenvolveu um software para poder abrir links porno na sua empresa."]
  break;
  }
      
      const mxmn = userdb.maxmoney / 2
      
      const dinheiro = Math.floor(Math.random() * mxmn) + mxmn

    client.dbUsers.boobsSet(`${interaction.user.id}/trabalho/cooldown`, Date.now() + userdb.cooldown)
    client.dbUsers.cumAdd(`${interaction.user.id}/money`, dinheiro)
     
    frase = frase[Math.floor(Math.random() * frase.length)]
     
    interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💸 Trabalho feito! `)
    .setColor("a5d7ff")
    .setDescription(`**Ta na mão chefia!** Você ${frase} como ${emprego} e ganhou 🤑 ${dinheiro} dinheiros.`)
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