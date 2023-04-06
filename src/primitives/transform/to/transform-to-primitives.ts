import { PrimitiveAggregate } from '../../types/primitive-aggregate';
import { AggregateRoot } from '../../../aggregate';

export function toPrimitives<T extends AggregateRoot>(aggregate: T): PrimitiveAggregate<T> {
  return { aggregateId: 'test' } as PrimitiveAggregate<T>;
}
