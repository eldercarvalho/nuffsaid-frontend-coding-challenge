import { Message, Priority } from '@/Api';

export const sortMessages = (arr: Message[]): Message[] => {
  const matrix: Message[][] = [];
  const nextRowPositions = { 0: 0, 1: 0, 2: 0 };

  arr.forEach((item) => {
    const currentRow = matrix[nextRowPositions[item.priority]];

    if (!currentRow) {
      const nextRow = Array(3).fill(null);
      nextRow[item.priority] = item;
      nextRowPositions[item.priority] += 1;
      matrix.push(nextRow);
      return;
    }

    const index = nextRowPositions[item.priority];
    matrix[index][item.priority] = item;
    nextRowPositions[item.priority] += 1;
  });

  return matrix.flatMap((item: Message[]) => item);
};

export const getMessagesCount = (messages: Message[]) => ({
  errorsCount: (messages.filter((msg) => msg.priority === Priority.Error) || []).length,
  warningCount: (messages.filter((msg) => msg.priority === Priority.Warn) || []).length,
  infoCount: (messages.filter((msg) => msg.priority === Priority.Info) || []).length,
});
