require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name:'setup',
        description: "Setup the bot in this channel."
    },

    {
        name: 'update',
        description: 'Update the time of a specific user on the leaderboard',
        options: [
            {
                name: 'username',
                description: 'The EXACT username (or @) which currently exists on the leaderboard.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'time',
                description: 'The new time for this user.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },

    {
        name: 'add',
        description: 'Add a new user to the leaderboard.',
        options: [
            {
                name: 'username',
                description: "Using the user's @ will ping the user any time the leaderboard gets updated.",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'time',
                description: 'The time for this user.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },

    {
        name: 'delete',
        description: 'Delete a user from the leaderboard.',
        options: [
            {
                name: 'username',
                description: "The EXACT username (or @) which currently exists on the leaderboard.",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async() => {
    try{
        console.log("Registering the slash commands.")
        await rest.put(Routes.applicationGuildCommands(
            process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )
        console.log("Registering the slash commands complete!")
    }
    catch (error) {
        console.log(`Error caught: ${error}`);
    }
})();