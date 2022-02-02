const dotenv = require('dotenv');
dotenv.config();
var { prefix } = require('./config.json');
const { Client, Intents } = require('discord.js');
var fs = require('fs');


const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"]  });

client.once('ready', () => {
	console.log('Ready!');
	console.log(`Loged in as: ${client.user.tag}!`);
    client.user.setStatus('idle');
    client.user.setActivity(`${prefix}help`, { type: "WATCHING" })
    const Guilds = client.guilds.cache;
    //console.log(Guilds);
    Guilds.forEach(element => {
        console.log(element.id + "\t" + element.name)

    });
});


client.on('messageCreate', async message => {
	//console.log(message)
	if(message.author.bot == true) return

    if (message.content.startsWith(prefix))
    {
		var lenpref = prefix.length
        const args = message.content.slice(lenpref).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
		if (commandName == "add") 
		{
			fs.appendFile('dataBase.file', `${message.channel.id},`, function (err) {
				if (err) throw err;
			  });
		}
		else if(commandName == "del")
		{
			var all = "";
			fs.readFile('dataBase.file', function(err, data) {
				all = data
				
				var ids = all.split(",")
				console.log(all);
			})
		}
		else if (commandName == "status") 
		{
		}

		client.channels.cache.get("896383202023858187").send("Ok")
		//console.log(client.channels.cache)
			console.log(all);
	}
})
client.login(process.env.DISCORD_TOKEN);