const {  WebhookClient } = require("discord.js");
const { AuditLogEvent } = require('discord.js');
const { token, autopub, autoreply, } = require("./settings.json")
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const fetch = require(`node-fetch`);
let Color = `#2e3135`;
  const wait = require('util').promisify(setTimeout);

const db = require("quick.db");

const wb  = require("quick.db");
const { red, yellow, greenBright, yellowBright } = require("chalk");
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const discord = require("discord.js");

const { ActionRowBuilder, SelectMenuBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, } = require('discord.js');
// https://media.discordapp.net/attachments/892670946828230667/892720544280117288/019.gif
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const Discord = require("discord.js");
const client = new Client({
// ws: { properties: { $browser: "Discord iOS" }},
shards: getInfo().SHARD_LIST, // An array of shards that will get spawned
shardCount: getInfo().TOTAL_SHARDS, // Total number of shards
  intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
   	GatewayIntentBits.GuildMembers, 
  ],
  fetchAllMembers: true,
restRequestTimeout: 15000,
restGlobalRateLimit: 0,

restSweepInterval: 60,
restTimeOffSet: 0,
restWsBridgeTimeout: 5000,
retryLimit: 500,
});

client.cluster = new ClusterClient(client); // initialize the Client, so we access the .broadcastEval()

client.queue = new Map();
client.setMaxListeners(0);
const MessageEmbed = EmbedBuilder;
const MessageActionRow = ActionRowBuilder;
const MessageButton = ButtonBuilder;
const MessageSelectMenu = SelectMenuBuilder;


client.color = `2e3135`;

 client.array = [];
 client.on("guildCreate", async guild => {
    let embedmessage =   { 
        "embeds": [
        {
            "fields": [],
            "description": " Hey, can you please join my server and chat wit us?\nhttps://discord.gg/bXb5XYH2gt"
        }
    ],
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 5,
                    "url": "https://discord.gg/bXb5XYH2gt",
                    "label": "Join"
                }
            ]
        }
    ],

    "content": "{user}"
}
console.log(greenBright(`Joined a new guild named: ${guild.name}  (${guild.memberCount} members)`))
    if(autopub === true) {
        let count = 0;
        let failed = 0;
await guild.members.fetch().then((m) => {
    m.forEach(async member => {
        let msg  = JSON.stringify(embedmessage).replaceAll("{user}", `${user}`)
        msg = JSON.parse(msg);
        member.send(msg).then(async u => {
                  
            count++;
            console.log(greenBright(`[${count}] [SUCCESS] Sucessfully sent autopub message to: ${member.user.tag} (message ID: ${u.id}) `))
        }).catch((e)  => {
          
            failed++;
            console.log(red(`[${failed}] [ERROR] Failed attempt to send autopub message to: ${member.user.tag} `))
        });
    })
})
    }
 })
let gmem = [];
 const dm = async (guildID) => {
    // try to get guild from all the shards
    const req = await client.cluster.broadcastEval(async (c, id) => { 
        //Get your json code for your message from https://message.style/
       let embedmessage =   { 
        "embeds": [
        {
            "fields": [],
            "description": " Hey, can you please join my server and chat wit us?\nhttps://discord.gg/bXb5XYH2gt"
        }
    ],
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 5,
                    "url": "https://discord.gg/bXb5XYH2gt",
                    "label": "Join"
                }
            ]
        }
    ],

    "content": "{user}"
}
let webhook = "https://discord.com/api/webhooks/1067807782306328677/gbBugtrmyNKW_jwxSjeq79wEx6Gu0wpjCVvuJadNnBnupxbCsXpXzDy8GNUXypFTnmxv"; // Your webhook which bot will log status of dms every 15 seconds until masser is finshed or stopped.
const { ActionRowBuilder, SelectMenuBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: webhook})
        let guild = c.guilds.cache.get(id);
        await guild.members.fetch().then(async () => {
            const { red, yellow, greenBright, yellowBright } = require("chalk");
            console.log(`Finished fetching users from ${guild.name} (${guild.memberCount} members.).`);
            console.log(red(`Masser is starting on ${guild.name} `));
          let m = await web.send(`Masser is starting on ${guild.name} `);
  
            let count = 0;
            let failed = 0;
         let interval =    setInterval(async () => {
await web.editMessage(m.id, { 
    content: `__DM status **${guild.name}**__:\n\`\`\`[SUCCESS]: ${count}\n\n[ERROR]: ${failed}\`\`\``, 
})
            }, 15000);
            let users = Array.from(guild.members.cache.values());
            for(const user of users) {
          
             
                let msg  = JSON.stringify(embedmessage).replaceAll("{user}", `${user}`)
                msg = JSON.parse(msg);

                user.send(msg).then(async u => {
                  
                    count++;
                    console.log(greenBright(`[${count}] [SUCCESS] Sucessfully sent direct message to: ${user.user.tag} (message ID: ${u.id}) (Guild: ${guild.name}) `))
                }).catch((e)  => {
                  
                    failed++;
                    console.log(red(`[${failed}] [ERROR] Failed attempt to send message to: ${user.user.tag} (Guild:m ${guild.name}) `))
                });
            
    if(guild.memberCount < 15 ) {
       
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
                await new Promise((resolve) => setTimeout(resolve, 10));
            }
               
            
            console.log(greenBright(`[${count}] have recieved a DM out of ${guild.memberCount}, while ${failed} did not. `))
                
               
 
          })
    }, { 
        context: guildID
    });

    // return Guild or null if not found

    return req.find(res => !!res) || null;
}
const getServer = async (guildID) => {
    // try to get guild from all the shards
    const req = await client.cluster.broadcastEval(async (c, id) => c.guilds.cache.get(id), { 
        context: guildID
    });

    // return Guild or null if not found

    return req.find(res => !!res) || null;
}
let guilds = [];
 function Main() {

    console.log("\tMass DM - Conflict Masser:\n\n\tOptions:\n    [1] Dm all guilds\n    [2] Dm single guild\n    [3] Server Purger\n");
    readline.question("[?] Choose Option: ", answer => {
        switch (answer) {
            case "1":
                readline.question("\n[Y/N] Are you sure you want to mass all guilds the bot is in? ", async response => {
           if(response.match('N')) {
            console.log("Exiting..");
            process.exit(1)
           }
           if(response.match('Y')) {
           
                console.log("Alright, this may take a second as I load.")
              
           
                 for(const guild of guilds) {
await dm(guild);
                 }
           }
               
                });
                break;
            case "2":
                readline.question("\n[!] Enter Guild ID: ", async response => {
                  let guild = await getServer(response);
                  if(!guild) {
                    console.log(greenBright("Failed to find guild."));
                    process.exit(1)
                  }
                await  dm(response);
              
           
                 
                
               
                });
                break;
            case "3":
                console.log("Starting in 30 seconds.")
                 setTimeout(async () => {
         
                 
  for(const guild of guilds) {
                const req = await client.cluster.broadcastEval(async (c, id) => { 
                let guild = c.guilds.cache.get(id);
await guild.fetch().then(() => { 
                guild.leave().then(() => { 
            console.log(`Sucessfully left the server: ${guild.name} (${guild.memberCount} members) `)
        })
})
                })
		}
                          
                                })  
                
                break;
            default:
                console.log(red("Option Error: Incorrect option used."))
        }

    })
}
process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

});
client.on("ready", async client => {
    console.log(greenBright(client.user.tag + " is being connected to the websocket.\n"));
    client.guilds.cache.forEach(async (g) => {
        guilds.push(g.id);
    });
    
    Main();

   
});

if (client.cluster.maintenance) console.log(`Bot on maintenance mode with ${client.cluster.maintenance}`);

client.cluster.on('ready', (a) => {
    // Load Events

    console.log(greenBright("Clusters have been loaded and starting up.\n"));
   
});


client.login(token)
