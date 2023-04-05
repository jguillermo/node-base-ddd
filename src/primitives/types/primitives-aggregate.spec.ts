import { PrimitiveAggregate } from './primitive-aggregate';
import { expectTypeOf } from 'expect-type';
import {
  ArrayTypeString,
  BooleanTypeImp,
  DateTypeImp,
  EnumType,
  IdTypeImp,
  NumberTypeImp,
  StringTypeImp,
  UuidTypeImp,
} from '../../type';
import { ArrayTypeNumber } from '../../type/array/array-type-number';

enum AggregateEnumValues {
  'CREATED' = 'created',
  'DELETED' = 'deleted',
}

export class AggregateEnum extends EnumType<AggregateEnumValues> {
  constructor(value: keyof typeof AggregateEnumValues | null | undefined = null) {
    super(EnumType.create<AggregateEnumValues>(value, Object.values(AggregateEnumValues)));
  }
}

class Aggregate {
  constructor(
    readonly aggregateId: IdTypeImp,
    readonly aggregateString: StringTypeImp,
    readonly aggregateBoolean: BooleanTypeImp,
    readonly aggregateDate: DateTypeImp,
    readonly aggregateEnum: AggregateEnum,
    readonly aggregateNumber: NumberTypeImp,
    readonly aggregateUuid: UuidTypeImp,
    readonly aggregateArrayString: ArrayTypeString,
    readonly aggregateArrayNumber: ArrayTypeNumber,
  ) {}
}

describe('Primitives', () => {
  it('should ensure to only return primitive properties excluding methods', () => {
    type actualPrimitives = PrimitiveAggregate<Aggregate>;
    // type actualPrimitives
    type expectedPrimitives = {
      readonly aggregateId: string | null;
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
