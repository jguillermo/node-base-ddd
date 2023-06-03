import { PrimitiveAggregate } from './primitive-aggregate';
import { expectTypeOf } from 'expect-type';
import { AggregateEnumValues, AggregateObjectMother } from '../../object-mother.spec';

describe('Primitives', () => {
  it('should ensure to only return primitive properties excluding methods', () => {
    type actualPrimitives = PrimitiveAggregate<AggregateObjectMother>;
    // type actualPrimitives
    type expectedPrimitives = {
      readonly aggregateId: string;
      readonly aggregateString: string | null;
      readonly aggregateBoolean: boolean | null;
      readonly aggregateDate: Date | null;
      readonly aggregateEnum: AggregateEnumValues | null;
      readonly aggregateNumber: number | null;
      readonly aggregateUuid: string | null;
      readonly aggregateArrayString: string[] | null;
      readonly aggregateArrayNumber: number[] | null;
    };
    expectTypeOf<actualPrimitives>().toEqualTypeOf<expectedPrimitives>();
  });
});
