import random from 'lodash/random';
import faker from 'faker';
import { v4 } from 'uuid';
import { Observable } from 'rxjs';

export enum Priority {
  Error,
  Warn,
  Info,
}

export interface Message {
  id: string;
  message: string;
  priority: Priority;
}

const observable = new Observable<Message>((subscriber) => {
  const generate = () => {
    const id = v4();
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as Priority;
    const nextInMS = random(500, 3000);
    subscriber.next({ id, message, priority });
    setTimeout(generate, nextInMS);
  };
  generate();
});

const subscribe = (callback: (message: Message) => void) => {
  const subscription = observable.subscribe({
    next: callback,
  });
  return () => subscription.unsubscribe();
};

export default subscribe;
