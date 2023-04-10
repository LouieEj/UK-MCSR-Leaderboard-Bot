require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({intents: [7796]});

const express = require('express');
const webserver = express();
webserver.set('port', (5000));
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(5000);

client.once("ready", () =>{
  console.log("bot alive");
})

leaderboardArray = [["Doug", 09, 07], ["Brent", 09, 36], ["Dec", 09, 47], ["Mauvu", 09, 47], ["Moley", 10, 02], ["Qam", 10, 05], ["Ripfc", 10, 15], ["Corobo", 10, 28], ["Priffin", 10, 36], ["Ravalle", 10, 39], ["Shmalex", 10, 51], ["Minigade", 11, 06], ["Josh", 11, 19], ["Krystl", 11, 43], ["Leonn", 11, 51], ["Eficz", 12, 03], ["Ontricus", 12, 13], ["George", 12, 26], ["Look_", 12, 26], ["Fulham", 12, 41], ["Fudge", 12, 51], ["Bendo", 13, 17], ["Kai", 13, 22], ["Louie", 14, 54], ["Emmy", 16, 11], ["Guffguffguffy", 16, 43], ["Mepsi", 18, 23], ["JaffaJake", 19, 45], ["BlueBel", 24, 05], ["Pebble", 24, 08], ["Lauren", 37, 51]]


var leaderboardMessageId = -1;

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName == "delete"){
        const name = interaction.options.get('username').value;
        try{
            var found = false;
            for (var i = 0; i < leaderboardArray.length; i++){
                if (leaderboardArray[i][0] == name){
                    found = true;
                    break;
                }
            }
            if (found){
                leaderboardArray = leaderboardArray.filter(function(element) { return element[0] != name });
                let channelId = await interaction.channelId;
                const channel = await client.channels.fetch(channelId).catch(() => null);
                sendLeaderboardMessage(channelId, channel);
                await interaction.reply({content: `Successfully deleted ${name} from the leaderboard!`}).catch(() => null);
            }
            else{
                await interaction.reply({content: "That user is not on the leaderboard! Make sure you spelt their name correctly and remember this command is cAsE sEnSiTiVe!"}).catch(() => null);
            }
        }
        catch(error){
            await interaction.reply({content: `An error occured: ${error}`}).catch(() => null);
        }
    }

    if (interaction.commandName == "add"){
        const name = interaction.options.get('username').value;
        const time = interaction.options.get('time').value;
        try{
            var found = false;
            for (var i = 0; i < leaderboardArray.length; i++){
                if (leaderboardArray[i][0] == name){
                    found = true;
                    break;
                }
                if (leaderboardArray[i][0].toUpperCase() == name){
                    found = true;
                    break;
                }
                if (leaderboardArray[i][0].toLowerCase() == name){
                    found = true;
                    break;
                }
            }
            if (!found){
                var splitTime = time.toString().split(":");
                var minutes = splitTime[0];
                var seconds = splitTime[1];
                leaderboardArray.push([name, minutes, seconds]);
                let channelId = await interaction.channelId;
                const channel = await client.channels.fetch(channelId).catch(() => null);
                sendLeaderboardMessage(channelId, channel);
                await interaction.reply({content: `Added ${name} to the leaderboard!`}).catch(() => null);;
            }
            else{
                await interaction.reply({content: "That user is already on the leaderboard! You can update their time using the `/update` command."}).catch(() => null);
            }
        }
        catch(error){
            await interaction.reply({content: `An error occured: ${error}`}).catch(() => null);
        }
    }

    if (interaction.commandName == "update"){
        const name = interaction.options.get('username').value;
        const time = interaction.options.get('time').value;
        try{
            var found = false;
            for (var i = 0; i < leaderboardArray.length; i++){
                if (leaderboardArray[i][0] == name || leaderboardArray[i][0].toUpperCase() == name || leaderboardArray[i][0].toLowerCase() == name){
                    found = true;
                    var splitTime = time.toString().split(":");
                    var minutes = splitTime[0];
                    var seconds = splitTime[1];
                    leaderboardArray[i][1] = parseInt(minutes);
                    leaderboardArray[i][2] = parseInt(seconds);
                    break;
                }
            }
            if (found){
                await interaction.reply({content: `Updated the time for ${name} successfully!`}).catch(() => null);;
                let channelId = await interaction.channelId;
                const channel = await client.channels.fetch(channelId).catch(() => null);;
                sendLeaderboardMessage(channelId, channel);
            }
            else{
                await interaction.reply({content: "That user is not already on the leaderboard! You can add them to the leaderboard using the `/add` command."}).catch(() => null);;
            }
        }
        catch(error){
            await interaction.reply({content: `An error occured: ${error}`});
        }
    }
    
    if (interaction.commandName == "setup"){
        try{
            await interaction.deferReply().catch(() => null);
            await interaction.deleteReply().catch(() => null);;
            let channelId = await interaction.channelId;
            const channel = await client.channels.fetch(channelId).catch(() => null);;
            await sendLeaderboardMessage(channelId, channel);
        }
        catch(error){
            await interaction.reply({content: `An error occured: ${error}`});
        }
    }
})

async function sendLeaderboardMessage(channelId, channel){
    leaderboard = "";
    leaderboardArray.sort(sortSeconds);
    leaderboardArray.sort(sortMinutes);
    for (var i = 0; i < leaderboardArray.length; i++){
        var minutes = leaderboardArray[i][1].toString();
        var seconds = leaderboardArray[i][2].toString();
        if (minutes.length < 2){
            minutes = "0" + minutes;
        }
        if (seconds.length < 2){
            seconds = "0" + seconds;
        }
        leaderboard += `**${ordinalSuffixOf(i+1)}**: ${leaderboardArray[i][0]} ` + "`" + `${minutes}:${seconds}` + "`\n";
    }
    let leaderboardMessage = await channel.send(leaderboard);
    if (leaderboardMessageId != -1){
        channel.messages.delete(leaderboardMessageId).catch(() => null);
    }
    leaderboardMessageId = leaderboardMessage.id;
}


function sortMinutes(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function sortSeconds(a, b) {
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}


function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (i == 1){
        return "🥇";
    }
    if(i == 2){
        return "🥈";
    }
    if(i == 3){
        return "🥉";
    }
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


client.login(process.env.TOKEN)
