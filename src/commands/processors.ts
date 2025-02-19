import { CommandList } from "./list.js";
import { helpCommands, helpCommandsOrder } from "./help.js";

export const processorsCheckers: Record<CommandList, (message: string) => boolean> = {
  help: (message) => message.startsWith('!help') && message.endsWith('!help'),
  ping: (message) => message.startsWith('!ping') && message.endsWith('!ping'),
  random: (message) => message.startsWith('!random') && /\!random\ (\d+)\ (\d+)/.test(message),
  rnd: (message) => message.startsWith('!rnd') && /\!rnd\ (\d+)\ (\d+)/.test(message),
  roll: (message) => message.startsWith('!roll') && message.endsWith('!roll'),
  homa: (message) => message.startsWith('!homa')
};

export const processors: Record<CommandList, (message: string, senderName: string) => string> = {
  help: (_message, senderName) => {
    return helpCommandsOrder.map((key) => {
      return `<br><b>Команда:</b> !${key} <br>Описание: ${helpCommands[key].description} <br>Пример: ${helpCommands[key].example} \n\n`;
    }).join('<br>');
  },
  ping: (_message, senderName) => {
    return `**${senderName}**, pong...`
  },
  random: (message, senderName) => {
    // @ts-ignore cause typed regexps fuck you
    const [_origin, first, second] = /\!random\ (\d+)\ (\d+)/.exec(message);
    return `**${senderName}**, result: ${randomIntFromInterval(Number(first), Number(second))}`;
  },
  rnd: (message, senderName) => {
    // @ts-ignore cause typed regexps fuck you
    const [_origin, first, second] = /\!rnd\ (\d+)\ (\d+)/.exec(message);
    return `**${senderName}**, result: ${randomIntFromInterval(Number(first), Number(second))}`;
  },
  roll: (_message, senderName) => {
    const result = Math.random();
    return `**${senderName}**, ${result > 0.5 ? 'Да XD' : 'Нет D:'}`
  },
  homa: (message, senderName) => {
    return `Функция потока из астрала пока на обеде, настраиваем каналы`;
  }
};

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
