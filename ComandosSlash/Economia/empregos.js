const Discord = require("discord.js")
module.exports = {
  name: "empregos",
  description: "pegar um emprego",
  run: async(client, interaction) =>{
   
  const embed = new Discord.EmbedBuilder()
    .setTitle('🤑 Escolha o melhor trabalho pra você!')
    .setColor("a5d7ff")
    .setDescription('Selecione um emprego para ver informações e pega-lo\nCada Emprego tem um cooldown e quantia de dinheiro ganha diferentes, quanto maior o dinheiro ganho, mais tempo de cooldown vai existir.')
  
const row = new Discord.ActionRowBuilder()
	.addComponents(
	new Discord.SelectMenuBuilder()
    .setCustomId('menu')
	.setPlaceholder('selecione algum emprego')
	.addOptions([
		{
			label: 'lixeiro',
            emoji: '🗑️',
			value: 'lixeiro',
		},
		{
	    	label: 'entregador de pizza',
            emoji: '🍕',
		    value: 'pizza',
		},
		{
			label: 'frentista',
            emoji: '⛽',
			value: 'frentista',
		},
		{
			label: 'caminheiro',
            emoji: '🚛',
			value: 'caminhao',
		},
		{
			label: 'sedex',
            emoji: '📦',
			value: 'sedex',
		},
		 {
			label: 'pescador',
            emoji: '🎣',
			value: 'peixe',
		},
		{
			label: 'TI',
            emoji: '💻',
			value: 'ti',
		}
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()
   console.log(i)
  if(i.componentType == 2) {
  const button = i.customId.split("_")[1]
  
  let trabalho,
      cooldown,
      maxmoney;
  
  switch (button) {
      
  case "lixeiro":
    trabalho = "lixeiro"
    cooldown = 1000 * 60 * 45
    maxmoney = 1000
  break;
  
  case "pizza":
    trabalho = "pizza"
    cooldown = 1000 * 60 * 90
    maxmoney = 1500
  break;
  
  case "frentista":
    trabalho = "frentista"
    cooldown = 1000 * 60 * 180
    maxmoney = 2500
  break;
  
  case "caminhao":
    trabalho = "caminhoneiro"
    cooldown = 1000 * 60 * 300
    maxmoney = 3500
  break;
  
  case "sedex":
    trabalho = "sedex"
    cooldown = 1000 * 60 * 420
    maxmoney = 6000
  break;
  
  case "pescador":
    trabalho = "pescador"
    cooldown = 1000 * 60 * 540
    maxmoney = 8500
  break;
  
  case "ti":
    trabalho = "ti"
    cooldown = 1000 * 60 * 600
    maxmoney = 10000
  break;
  }
  
  interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`☑️ Você entrou em um novo emprego!`)
    .setColor("a5d7ff")
    .setDescription(`**Certo!** Você pegou um novo emprego.`)
], components: []})
  
    client.dbUsers.boobsSet(`${interaction.user.id}/trabalho`, {
         maxmoney: maxmoney,
         trampo: trabalho,
         cooldown: cooldown
       })
  
  }
   
  if(i.componentType == 3)  {
  const select = i.values[0]
    if(select == 'lixeiro'){
        
      interaction.editReply({embeds: [msgembed("🗑️", "lixeiro", "45m", 1)], components: [row, button("lixeiro")]})
      
    }
    
        if(select == 'pizza'){

      interaction.editReply({embeds: [msgembed("🍕", "entregador de pizza", "1h", 1.5)], components: [row, button("pizza")]})
    }
    
    if(select == 'frentista'){
      
      interaction.editReply({embeds: [msgembed("⛽", "frentista", "3h", 2.5)], components: [row, button("frentista")]})
   
    }
    
    if(select == 'caminhao'){
        
      interaction.editReply({embeds: [msgembed("🚛", "caminhoneiro", "5h", 3.5)], components: [row, button("caminhao")]})
   
    }
    
    if(select == 'sedex'){
        
      interaction.editReply({embeds: [msgembed("📦", "entregador de sedex", "7h", 6)], components: [row, button("sedex")]})
    }
    
    if(select == 'peixe'){
        
      interaction.editReply({embeds: [msgembed("🎣", "pescador", "9h", 8.5)], components: [row, button("pescador")]})
      
    }
    
    if(select == 'ti'){
        
      interaction.editReply({embeds: [msgembed("💻", "chefe de ti", "10h", 10)], components: [row, button("ti")]})
      
    }
    
  }//if menus
  
})//collector
  
})//.then
    
  }
}

function msgembed(emoji, emprego, cooldown, ganhos){
    return new Discord.EmbedBuilder()
    .setTitle(`${emoji} Emprego de ${emprego}.`)
    .setColor("a5d7ff")
    .setDescription(`🕑 Cooldown no comando de work: ${cooldown} \n💸 Ganhos máximo: ${ganhos}k`)
}

function button(String){
    return new Discord.ActionRowBuilder()
	.addComponents(
		new Discord.ButtonBuilder()
		.setCustomId(`aceitar_${String}`)
		.setLabel('Pegar emprego')
		.setStyle(Discord.ButtonStyle.Secondary),
			);
}

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}