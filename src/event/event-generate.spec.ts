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
import { AggregateRoot } from '../aggregate';
import { Primitives } from '../primitives/primitives';
import { EventBase } from './event-base';

enum EnumCourseStatus {
  'CREATED' = 'created',
  'DELETED' = 'deleted',
}

export class CourseActive extends BooleanType {}

export class CourseCreated extends DateType {}

export class CourseStatus extends EnumType<EnumCourseStatus> {}

export class CourseId extends IdType {}

export class customerId extends IdType {}

export class CourseDuration extends NumberType {}

export class CourseName extends StringType {}

export class CourseCode extends UuidType {}

export class CourseTags extends ArrayTypeString {}

export class CourseImage extends ArrayType<string> {
  protected itemValidator(item: any): boolean {
    return !!item;
  }
}

export class CoursePrice extends ArrayType<number> {
  protected itemValidator(item: any): boolean {
    return !!item;
  }
}

export class CourseCustomers extends ArrayType<customerId> {
  protected itemValidator(item: any): boolean {
    return !!item;
  }
}

class Course extends AggregateRoot<Course> {
  constructor(
    readonly id: CourseId,
    readonly name: CourseName, // readonly created: CourseCreated, // readonly active: CourseActive, // readonly status: CourseStatus, // readonly duration: CourseDuration, // readonly code: CourseCode, // readonly tags: CourseTags, // readonly price: CoursePrice, // readonly customers: CourseCustomers,
  ) {
    super();
  }

  static fromPrimitives(values: Primitives<Course>): Course {
    return new Course(
      new CourseId(values.id),
      new CourseName(values.name),
      // new CourseCreated(values.created),
      // new CourseActive(values.active),
      // new CourseStatus(values.status),
      // new CourseDuration(values.duration),
      // new CourseCode(values.code),
      // new CourseTags(values.tags),
      // new CoursePrice(values.price),
      // new CourseCustomers(values.customers ? values.customers.map((customer) => new customerId(customer)) : null),
    );
  }

  toPrimitives(): Primitives<Course> {
    return {
      id: this.id.value,
      name: this.name.value,
      // created: this.created.value,
      // active: this.active.value,
      // status: this.status.value,
      // duration: this.duration.value,
      // code: this.code.value,
      // tags: this.tags.value,
      // price: this.price.value,
      // customers: this.customers.value ? this.customers.value.map((customer) => customer.value) : null,
    };
  }

  sendEvent(): void {
    this.recordBy(TestEventBase);
  }
}

class TestEventBase extends EventBase {
  id: string;

  eventName(): string {
    return 'event.name.test';
  }
}

describe('TestEventBase', () => {
  it('eventName', () => {
    const course = Course.fromPrimitives({
      id: 'de76374c-c08a-4bf3-8c64-649a22cddc90',
      name: 'demo',
    });
    course.sendEvent();
    const events = course.pullDomainEvents();
    expect(events[0].eventName()).toEqual('event.name.test');
    expect(events[0]['id']).toEqual('de76374c-c08a-4bf3-8c64-649a22cddc90');
  });
});
