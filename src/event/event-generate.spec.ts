import { IdType, StringType } from '../type';
import { AggregateRoot } from '../aggregate';
import { PrimitiveAggregate } from '../primitives/types/primitive-aggregate';
import { EventBase } from './event-base';

export class CourseId extends IdType {}

export class CourseName extends StringType {}

class Course extends AggregateRoot {
  constructor(readonly id: CourseId, readonly name: CourseName) {
    super();
  }

  static fromPrimitives(values: PrimitiveAggregate<Course>): Course {
    return new Course(new CourseId(values.id), new CourseName(values.name));
  }

  toPrimitives(): PrimitiveAggregate<Course> {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }

  sendEvent(): void {
    //this.recordBy(TestEventBase);
  }
}

class TestEventBase extends EventBase {
  id: string;

  eventName(): string {
    return 'event.name.test';
  }
}

describe.skip('TestEventBase', () => {
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
