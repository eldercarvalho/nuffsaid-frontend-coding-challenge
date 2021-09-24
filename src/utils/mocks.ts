import { Priority } from '@/services/Api';
import faker from 'faker';

export const mockMessages = () => [
  {
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    priority: Priority.Error,
  },
  {
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    priority: Priority.Warn,
  },
  {
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    priority: Priority.Info,
  },
];
