import { Colors, GatewayIntentBits } from 'discord.js'

export const settings = {
    prefix: "!",
    botId: "0",
    embedColor: {
        error: Colors.Red,
        default: Colors.Blue,
        warning: Colors.Orange
    },
    owners: [
        "0" 
    ], // Owner IDs
    slashCommands: {
        whitelistedGuilds: [
            "0" // Support Server
        ], // It will be ignored if global is enabled
        global: false // Global commands
    },
    botIntents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
}