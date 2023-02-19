import { Primitives } from './primitives';
import { expectTypeOf } from 'expect-type';
import {
  ArrayType,
  ArrayTypeString,
  BooleanType,
  DateType,
  EnumType,
  IdType,
  NumberType,
  StringType,
  UuidType,
} from '../type';

enum EnumCourseStatus {
  'CREATED' = 'created',
  'DELETED' = 'deleted',
}

export class CourseActive extends BooleanType {}

export class CourseCreated extends DateType {}

export class CourseStatus extends EnumType<EnumCourseStatus> {
  constructor(value: keyof typeof EnumCourseStatus | null | undefined = null) {
    super(EnumType.create<EnumCourseStatus>(value, Object.values(EnumCourseStatus)));
  }
}

export class CourseId extends IdType {}

export class CourseDuration extends NumberType {}

export class CourseName extends StringType {}

export class CourseCode extends UuidType {}

export class CourseTags extends ArrayTypeString {}

export class CourseImage extends ArrayType<string> {
  protected itemValidator(item: any): boolean {
    return true;
  }
}

export class CoursePrice extends ArrayType<number> {
  protected itemValidator(item: any): boolean {
    return true;
  }
}

class Course {
  constructor(
    readonly courseId: CourseId,
    readonly courseName: CourseName,
    readonly courseCreated: CourseCreated,
    readonly courseActive: CourseActive,
    readonly courseStatus: CourseStatus,
    readonly courseDuration: CourseDuration,
    readonly courseCode: CourseCode,
    readonly courseTags: CourseTags,
    readonly courseImage: CourseImage,
    readonly coursePrice: CoursePrice,
  ) {}
}

describe('Primitives', () => {
  it('should ensure to only return primitive properties excluding methods', () => {
    type actualPrimitives = Primitives<Course>;
    type expectedPrimitives = {
      readonly courseActive: boolean | null;
      readonly courseCreated: Date | null;
      readonly courseStatus: EnumCourseStatus | null;
      readonly courseId: string | null;
      readonly courseDuration: number | null;
      readonly courseName: string | null;
      readonly courseCode: string | null;
      readonly courseTags: string[] | null;
      readonly courseImage: string[] | null;
      readonly coursePrice: number[] | null;
    };
    expectTypeOf<actualPrimitives>().toEqualTypeOf<expectedPrimitives>();
  });
});
