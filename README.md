# UK MCSR Leaderboard Bot
### A Discord bot for the UK MCSR Discord server, to easily display and update contents of the leaderboard.

# Brief tutorial
Add the bot to a server using the latest link from the [releases page](https://github.com/louiee15/UK-MCSR-Leaderboard-Bot/releases).
## Commands
- `/setup` - sets up the bot. Only issue this command once, on a single channel.

**Only issue commands in the same channel that the bot was setup in.**
- `/add <username> <time>` - add a new user to the leaderboard. The `<time>` should be formatted as `mm:ss`.
- `/update <username> <time>` - update the time of a specific user on the leaderboard.
- `/delete <username>` - delete a specific user from the leaderboard. The `<username>` is cAsE sEnSiTiVe.

# Advanced tutorial
## Adding the bot
To add the bot head to the [releases page](https://github.com/louiee15/UK-MCSR-Leaderboard-Bot/releases) and click the link for the most recent release.
Follow the necessary steps to add the bot to a server.

## Setup
To setup the bot to begin using it, you first need to issue the `/setup` command **in the channel you want the bot to stay in.**

**Note: do NOT use the bot commands in multiple different channels, as this can cause issues.**

## Adding to the leaderboard
To add a new user to the leaderboard, use the `/add` command.

This command takes two parameters: the username and the time of the user (PB time).
- The username can be either a plain string, or you can @ a specific user (however using @s will ping that user anytime the leaderboard is updated).
- The time should be input as `mm:ss` (e.g. `09:36`).

## Updating the leaderboard
To update the leaderboard, use the `/update` command.

This command takes two parameters: the username of who you want to update and the new time of that user.

## Deleting from the leaderboard
Users can be removed from the leaderboard. To do this, use the `/delete` command.

This commands take one parameter: the **exact** username of who you want to remove from the leaderboard.

**Note: this is case sensitive. Trying to remove `Louie` from the leaderboard using `/delete louie` will NOT work, but `/delete Louie` will work.**
