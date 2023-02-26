import { Primitives } from './primitives';
import { expectTypeOf } from 'expect-type';
import { ArrayType, IdType } from '../type';

export class customerId extends IdType {}

export class CourseCustomers extends ArrayType<customerId> {
  protected itemValidator(item: any): boolean {
    return true;
  }
}

class Course {
  constructor(readonly courseCustomers: CourseCustomers) {}
}

describe('Primitives', () => {
  it('should ensure to only return primitive properties excluding methods', () => {
    type actualPrimitives = Primitives<Course>;
    // type actualPrimitives
    type expectedPrimitives = {
      readonly courseCustomers: string[] | null;
    };
    expectTypeOf<actualPrimitives>().toEqualTypeOf<expectedPrimitives>();
  });
});
