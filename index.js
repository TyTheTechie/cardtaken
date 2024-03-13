// Import the necessary discord.js library for the selfbot
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
// Load configuration from config.json
const config = require('./config.json');

// Extract the specific IDs needed for operation from the config file
const specificGuildId = config.guildId;
const specificChannelId = config.channelId;
const specificBotId = config.aniId;

// Initialize counters for tracking button click results
let successfulClicks = 0;
let failedClicks = 0;

// Setup event listener for when the bot is ready
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  // Fetch the specified server and channel from the IDs provided in config
  const guild = client.guilds.cache.get(specificGuildId);
  if (!guild) {
    console.log('Server not found!');
    return;
  }

  const channel = guild.channels.cache.get(specificChannelId);
  if (!channel) {
    console.log('Channel not found!');
    return;
  }

  // Attempt to fetch and log the bot user being monitored
  guild.members.fetch(specificBotId)
    .then(botMember => console.log(`Monitoring messages from: ${botMember.user.username}`))
    .catch(err => console.log(`Bot with ID ${specificBotId} not found in ${guild.name}.`, err));

  console.log(`Connected to server: ${guild.name}`);
  console.log(`Monitoring channel: ${channel.name}`);

  // Fetch and log the last 3 messages in the channel for initial verification
  try {
    const messages = await channel.messages.fetch({ limit: 3 });
    console.log('Last 3 messages in channel:');
    messages.forEach(message => console.log(`[${message.createdAt}] ${message.author.username}: ${message.content}`));
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }  
});

// Setup event listener for new message creation
client.on('messageCreate', async message => {
  // Check if the message meets the criteria (bot message, correct author ID, channel ID, and has embeds)
  if (message.author.bot && message.author.id === specificBotId && message.channel.id === specificChannelId && message.embeds.length > 0) {
    const embed = message.embeds[0];
    if (embed.description && embed.title.includes("What's this?") && embed.description.includes("A wild AniGame card appears!")) {
      console.log("AniGame card embed detected!");

      // Check for and interact with the 'Claim' button if present
      if (message.components && message.components.length > 0) {
        const actionRow = message.components[0];
        if (actionRow && actionRow.components && actionRow.components.length > 0) {
          const button = actionRow.components.find(component => component.type === 'BUTTON' && component.label === 'Claim!');
          if (button && button.customId) {
            try {
              await message.clickButton(button.customId);
              successfulClicks++;
              console.log(`Button ${button.customId} clicked successfully.`);
            } catch (error) {
              failedClicks++;
              if (error.message.includes('No response from Application Command')) {
                console.log(`Button ${button.customId} was already clicked by someone else.`);
              } else {
                console.log(`Failed to click button ${button.customId}. Unhandled error: ${error}`);
              }
            }
          }
        }
      }
    }
  }
});

// Handle bot shutdown gracefully
process.on('SIGINT', () => {
  console.log(`Bot is shutting down.`);
  console.log(`Total successful clicks: ${successfulClicks}`);
  console.log(`Total failed/timed out clicks: ${failedClicks}`);
  process.exit();
});

// Log in the bot using the token provided in the config file
client.login(config.token);
