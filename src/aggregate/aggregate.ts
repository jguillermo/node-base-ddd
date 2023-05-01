import { AggregateRoot } from './aggregate-root';
import { PrimitiveAggregate } from '../primitives/types/primitive-aggregate';
import { instanceToPrimitives } from '../primitives/transform/to/transform-to-primitives';
import { aggregateToEvent, EventBase } from '../event';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export abstract class Aggregate<T extends AggregateRoot> extends AggregateRoot {
  toPrimitives(): PrimitiveAggregate<Aggregate<T>> {
    return instanceToPrimitives(this);
  }
  recordBy<E extends EventBase>(clsEvent: ClassConstructor<E>): void {
    this.record(aggregateToEvent(clsEvent, this.toPrimitives()));
  }
}
