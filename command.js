const { REST, Routes } = require("discord.js");
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];
const rest = new REST({ version: "10" }).setToken(
  "MTIxNjY1ODM1OTU3OTcwOTUwMA.G7PFex.28O1adAn8Fvqsfl-d_6tDSJ0eaZ9iXcVimXsaI"
);
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1216658359579709500"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
