require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const IGNORE_PREFIX = "!";
const CHANNELS = ['1216657383435010091'];

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: 'chat gpt is a friendly chatbot',
                },
                {
                    role: 'user',
                    content: message.content,
                }
            ]
        });

        message.channel.send(response.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI error:", error);
    }
});

client.on('interactionCreate', (interaction) => {
    interaction.reply('pong!!!');
});

client.login(process.env.TOKEN);
