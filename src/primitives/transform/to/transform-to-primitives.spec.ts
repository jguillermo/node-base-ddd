import { AggregateObjectMotherId } from '../../../object-mother.spec';
import { toPrimitives } from './transform-to-primitives';
import { faker } from '@faker-js/faker';

AggregateObjectMotherId;

describe('Primitives to primitive', () => {
  it('id', () => {
    const uuid = faker.datatype.uuid();
    const aggregate = new AggregateObjectMotherId(uuid);
    expect(toPrimitives(aggregate)).toEqual({ aggregateId: uuid });
  });
});
