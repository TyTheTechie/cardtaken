# cardtaken
Anime Card Game Swiper.  

# Weebs with power

This project is a Discord tool designed to monitor messages in a specific channel and interact with them automatically, particularly focusing on detecting and clicking a "Claim" button within embeds sent by a specific client.

## Disclaimer

Using selfbots can violate Discord's Terms of Service. This project is provided for educational purposes only. Use it at your own risk, and always ensure compliance with Discord's guidelines.

## Configuration

Before running the bot, you need to configure it with your Discord bot token and the specific IDs for the guild (server), channel, and target bot it will interact with. These configurations are stored in `config.json`.

### `config.json`

- `token`: Your Discord bot's token.
- `guildId`: The ID of the guild (server) where the bot will operate.
- `channelId`: The ID of the channel to monitor for messages.
- `aniId`: The ID of the target bot whose messages will be interacted with.

### Setup

    Clone the repository to your local machine.
    Install Node.js if you haven't already.
    Navigate to the project directory and run npm install to install dependencies.
    Fill in your config.json with the appropriate values.
    Start the bot with node index.js.

###Features

    Automatically detects specific messages based on configured criteria.
    Attempts to click a "Claim" button within detected messages.
    Logs successes and failures to interact with the button.

###Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your proposed changes.
License

This project is released under the MIT License.
Contact

For questions or feedback, please open an issue in the GitHub repository.

