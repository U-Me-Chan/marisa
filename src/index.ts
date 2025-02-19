import NoodleJS from 'noodle.js';
import { helpCommandsOrder } from "./commands/help.js";
import { processors, processorsCheckers } from "./commands/processors.js";

process.on('unhandledRejection', err => {
  console.error(err);
});

process.on('uncaughtException', err => {
  console.error(err);
});

// @ts-ignore cause its hacky way to ignore self signed cert error :^)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const client = new NoodleJS({
  url: 'scheoble.xyz',
  name: 'marisa',
  rejectUnauthorized: false,
});

client.on('ready', () => {
  console.log('Client ready');
});

client.on('message', async (event) => {
  const commandKey = helpCommandsOrder.find((commandKey) => processorsCheckers[commandKey](event.content));
  if (commandKey) {
    event.sender.channel.sendMessage(await processors[commandKey](event.content, event.sender.name, (msg) => event.sender.channel.sendMessage(msg)));
    return;
  }

  if (event.content.includes('мариса') || event.content.includes('Мариса') || event.content.includes('marisa')) {
    event.sender.channel.sendMessage('Сосал? Юзай !help');
    return;
  }
});

client.connect();
