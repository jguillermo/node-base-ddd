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
  private readonly _aggregateId: IdTypeImp;

  constructor(aggregateId?: string) {
    super();
    this._aggregateId = new IdTypeImp(aggregateId ?? faker.datatype.uuid());
  }

  get aggregateId(): IdTypeImp {
    return this._aggregateId;
  }
}

export class AggregateObjectMotherString extends AggregateRoot {
  private readonly _aggregateString: StringTypeImp;

  constructor(aggregateString?: string) {
    super();
    this._aggregateString = new StringTypeImp(aggregateString ?? faker.datatype.string());
  }

  get aggregateString(): StringTypeImp {
    return this._aggregateString;
  }
}

export class AggregateObjectMotherBoolean extends AggregateRoot {
  private readonly _aggregateBoolean: BooleanTypeImp;

  constructor(aggregateBoolean?: boolean) {
    super();
    this._aggregateBoolean = new BooleanTypeImp(aggregateBoolean ?? faker.datatype.boolean());
  }

  get aggregateBoolean(): BooleanTypeImp {
    return this._aggregateBoolean;
  }
}

export class AggregateObjectMotherDate extends AggregateRoot {
  private readonly _aggregateDate: DateTypeImp;

  constructor(aggregateDate?: Date) {
    super();
    this._aggregateDate = new DateTypeImp(aggregateDate ?? faker.datatype.datetime());
  }

  get aggregateDate(): DateTypeImp {
    return this._aggregateDate;
  }
}

export class AggregateObjectMotherNumber extends AggregateRoot {
  private readonly _aggregateNumber: NumberTypeImp;

  constructor(aggregateNumber?: number) {
    super();
    this._aggregateNumber = new NumberTypeImp(aggregateNumber ?? faker.datatype.number());
  }

  get aggregateNumber(): NumberTypeImp {
    return this._aggregateNumber;
  }
}

export class AggregateObjectMotherUuid extends AggregateRoot {
  private readonly _aggregateUuid: UuidTypeImp;

  constructor(aggregateUuid?: string) {
    super();
    this._aggregateUuid = new UuidTypeImp(aggregateUuid ?? faker.datatype.uuid());
  }

  get aggregateUuid(): UuidTypeImp {
    return this._aggregateUuid;
  }
}

export class AggregateObjectMotherEnum extends AggregateRoot {
  private readonly _aggregateEnum: AggregateEnumObjectMother;

  constructor(aggregateEnum?: AggregateEnumValues) {
    super();
    this._aggregateEnum = new AggregateEnumObjectMother(aggregateEnum ?? 'CREATED');
  }

  get aggregateEnum(): AggregateEnumObjectMother {
    return this._aggregateEnum;
  }
}

export class AggregateObjectMotherArrayString extends AggregateRoot {
  private readonly _aggregateArrayString: ArrayTypeString;

  constructor(aggregateArrayString?: string[]) {
    super();
    this._aggregateArrayString = new ArrayTypeString(aggregateArrayString ?? [faker.datatype.string()]);
  }

  get aggregateArrayString(): ArrayTypeString {
    return this._aggregateArrayString;
  }
}

export class AggregateObjectMotherArrayNumber extends AggregateRoot {
  private readonly _aggregateArrayNumber: ArrayTypeNumber;

  constructor(aggregateArrayNumber?: number[]) {
    super();
    this._aggregateArrayNumber = new ArrayTypeNumber(aggregateArrayNumber ?? [faker.datatype.number()]);
  }

  get aggregateArrayNumber(): ArrayTypeNumber {
    return this._aggregateArrayNumber;
  }
}

export class AggregateObjectMother {
  readonly aggregateId: IdTypeImp;
  readonly aggregateString: StringTypeImp;
  readonly aggregateBoolean: BooleanTypeImp;
  readonly aggregateDate: DateTypeImp;
  readonly aggregateNumber: NumberTypeImp;
  readonly aggregateUuid: UuidTypeImp;
  readonly aggregateEnum: AggregateEnumObjectMother;
  readonly aggregateArrayString: ArrayTypeString;
  readonly aggregateArrayNumber: ArrayTypeNumber;

  constructor(data?: {
    aggregateId?: string;
    aggregateString?: string;
    aggregateBoolean?: boolean;
    aggregateDate?: Date;
    aggregateNumber?: number;
    aggregateUuid?: string;
    aggregateEnum?: AggregateEnumValues;
    aggregateArrayString?: string[];
    aggregateArrayNumber?: number[];
  }) {
    this.aggregateId = new IdTypeImp(data?.aggregateId ?? faker.datatype.uuid());
    this.aggregateString = new StringTypeImp(data?.aggregateString ?? faker.datatype.string());
    this.aggregateBoolean = new BooleanTypeImp(data?.aggregateBoolean ?? faker.datatype.boolean());
    this.aggregateDate = new DateTypeImp(data?.aggregateDate ?? faker.datatype.datetime());
    this.aggregateNumber = new NumberTypeImp(data?.aggregateNumber ?? faker.datatype.number());
    this.aggregateUuid = new UuidTypeImp(data?.aggregateUuid ?? faker.datatype.uuid());
    this.aggregateEnum = new AggregateEnumObjectMother(data?.aggregateEnum ?? 'CREATED');
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
