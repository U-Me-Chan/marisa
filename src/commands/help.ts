import { CommandList } from "./list.js";

export type HelpCommand = {
  description: string;
  example: string;
};

export const helpCommands: Record<CommandList, HelpCommand> = {
  help: {
    description: 'Помогает разобраться',
    example: '!help',
  },
  ping: {
    description: 'Проверить, что бот тут. Или ты. Или мы.',
    example: '!ping',
  },
  roll: {
    description: 'Да/Нет',
    example: '!roll',
  },
  random: {
    description: 'Выдаёт число от N до M',
    example: '!random 1 5',
  },
  rnd: {
    description: 'То же, что и !random',
    example: '!rand 1 5',
  },
  homa: {
    description: 'Поток из астрала',
    example: '!homa поясни за бота',
  }
};

export const helpCommandsOrder: CommandList[] = [
  'help',
  'ping',
  'roll',
  'random',
  'rnd',
  'homa'
];
