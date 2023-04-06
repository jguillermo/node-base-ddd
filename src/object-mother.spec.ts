import {
  ArrayTypeString,
  BooleanTypeImp,
  DateTypeImp,
  EnumType,
  IdTypeImp,
  NumberTypeImp,
  StringTypeImp,
  UuidTypeImp,
} from './type';
import { ArrayTypeNumber } from './type/array/array-type-number';

export enum AggregateEnumValues {
  'CREATED' = 'CREATED',
  'DELETED' = 'DELETED',
}

export class AggregateEnumObjectMother extends EnumType<AggregateEnumValues> {
  constructor(value: keyof typeof AggregateEnumValues | null | undefined = null) {
    super(EnumType.create<AggregateEnumValues>(value, Object.values(AggregateEnumValues)));
  }
}

export class AggregateObjectMother {
  readonly aggregateId: IdTypeImp;
  readonly aggregateString: StringTypeImp;
  readonly aggregateBoolean: BooleanTypeImp;
  readonly aggregateDate: DateTypeImp;
  readonly aggregateEnum: AggregateEnumObjectMother;
  readonly aggregateNumber: NumberTypeImp;
  readonly aggregateUuid: UuidTypeImp;
  readonly aggregateArrayString: ArrayTypeString;
  readonly aggregateArrayNumber: ArrayTypeNumber;

  constructor() {
    this.aggregateId = new IdTypeImp('16673a29-ec81-461a-94dc-8af6391c4ebb');
    this.aggregateString = new StringTypeImp('string');
    this.aggregateBoolean = new BooleanTypeImp(true);
    this.aggregateDate = new DateTypeImp(new Date());
    this.aggregateEnum = new AggregateEnumObjectMother('CREATED');
    this.aggregateNumber = new NumberTypeImp(1);
    this.aggregateUuid = new UuidTypeImp('1e6c3dbe-e162-4bea-84f7-d56bb1c235b5');
    this.aggregateArrayString = new ArrayTypeString(['string']);
    this.aggregateArrayNumber = new ArrayTypeNumber([1]);
  }
}

describe('AggregateObjectMother', () => {
  it('get set', () => {
    const aggregate = new AggregateObjectMother();
    expect(aggregate.aggregateString.value).toEqual('string');
  });
});
