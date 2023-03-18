import { AggregateRoot } from '../../../aggregate';
import { PrimitiveAggregate } from '../../types/primitive-aggregate';

export function toPrimitives<T extends AggregateRoot<T>>(aggregate: T): PrimitiveAggregate<T> {
  return { propertieString: 'test' } as PrimitiveAggregate<T>;
}
