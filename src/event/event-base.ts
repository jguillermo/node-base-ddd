import { AggregateRoot } from '../aggregate';
import { PrimitiveAggregate } from '../primitives/types/primitive-aggregate';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export abstract class EventBase {
  abstract eventName(): string;
}

export function aggregateToEvent<E extends EventBase, T extends AggregateRoot>(
  clsEvent: ClassConstructor<E>,
  aggregatePrimitives: PrimitiveAggregate<T>,
): E {
  return plainToInstance(clsEvent, aggregatePrimitives) as E;
}
