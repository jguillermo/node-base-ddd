import { EnumType, StringType, StringTypeImp } from '../../../type';
import { toPrimitives } from './transform-to-primitives';
import { AggregateRoot } from '../../../aggregate';
import { PrimitiveAggregate } from '../../types/primitive-aggregate';

enum EnumCourseStatus {
  'CREATED' = 'created',
  'DELETED' = 'deleted',
}

export class CourseStatus extends EnumType<EnumCourseStatus> {
  constructor(value: keyof typeof EnumCourseStatus | null | undefined = null) {
    super(EnumType.create<EnumCourseStatus>(value, Object.values(EnumCourseStatus)));
  }
}

class ClsStringType extends AggregateRoot<ClsStringType> {
  readonly propertieString: StringType;

  toPrimitives(): PrimitiveAggregate<ClsStringType> {
    return {
      propertieString: this.propertieString.value,
    };
  }

  constructor() {
    super();
    this.propertieString = new StringTypeImp('test');
  }
}

describe('Primitives', () => {
  it('should ensure to only return primitive properties excluding methods', () => {
    const data = toPrimitives(new ClsStringType());
    expect(data).toEqual({ propertieString: 'test' });
  });
});
