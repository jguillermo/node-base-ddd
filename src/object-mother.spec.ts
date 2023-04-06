import { faker } from '@faker-js/faker';
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
import { AggregateRoot } from './aggregate';

export enum AggregateEnumValues {
  'CREATED' = 'CREATED',
  'DELETED' = 'DELETED',
}

export class AggregateEnumObjectMother extends EnumType<AggregateEnumValues> {
  constructor(value: keyof typeof AggregateEnumValues | null | undefined = null) {
    super(EnumType.create<AggregateEnumValues>(value, Object.values(AggregateEnumValues)));
  }
}

export class AggregateObjectMotherId extends AggregateRoot {
  readonly aggregateId: IdTypeImp;

  constructor(aggregateId?: string) {
    super();
    this.aggregateId = new IdTypeImp(aggregateId ?? faker.datatype.uuid());
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

  constructor(data?: {
    aggregateId?: string;
    aggregateString?: string;
    aggregateBoolean?: boolean;
    aggregateDate?: Date;
    aggregateEnum?: AggregateEnumValues;
    aggregateNumber?: number;
    aggregateUuid?: string;
    aggregateArrayString?: string[];
    aggregateArrayNumber?: number[];
  }) {
    this.aggregateId = new IdTypeImp(data?.aggregateId ?? faker.datatype.uuid());
    this.aggregateString = new StringTypeImp(data?.aggregateString ?? faker.datatype.string());
    this.aggregateBoolean = new BooleanTypeImp(data?.aggregateBoolean ?? faker.datatype.boolean());
    this.aggregateDate = new DateTypeImp(data?.aggregateDate ?? faker.datatype.datetime());
    this.aggregateEnum = new AggregateEnumObjectMother(data?.aggregateEnum ?? 'CREATED');
    this.aggregateNumber = new NumberTypeImp(data?.aggregateNumber ?? faker.datatype.number());
    this.aggregateUuid = new UuidTypeImp(data?.aggregateUuid ?? faker.datatype.uuid());
    this.aggregateArrayString = new ArrayTypeString(data?.aggregateArrayString ?? [faker.datatype.string()]);
    this.aggregateArrayNumber = new ArrayTypeNumber(data?.aggregateArrayNumber ?? [faker.datatype.number()]);
  }
}

describe('AggregateObjectMother', () => {
  it('get set', () => {
    const aggregate = new AggregateObjectMother({ aggregateString: 'string' });
    expect(aggregate.aggregateString.value).toEqual('string');
  });
});
