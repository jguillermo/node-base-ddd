import { IdTypeImp } from '../type';
import { AggregateRoot } from '../aggregate';
import { aggregateToEvent, EventBase } from './event-base';
import { instanceToPrimitives } from '../primitives/transform/to/transform-to-primitives';

class TestEventBase extends EventBase {
  aggregateId: string;

  eventName(): string {
    return 'event.name.test';
  }
}

export class AggregateObjectMotherId extends AggregateRoot {
  private readonly aggregateId: IdTypeImp;

  constructor(aggregateId: string) {
    super();
    this.aggregateId = new IdTypeImp(aggregateId);
  }
  sendEvent(): void {
    this.record(aggregateToEvent(TestEventBase, instanceToPrimitives(this)));
  }
}

describe('TestEventBase', () => {
  it('eventName', () => {
    const id = 'de76374c-c08a-4bf3-8c64-649a22cddc90';
    const course = new AggregateObjectMotherId(id);
    course.sendEvent();
    const events = course.pullDomainEvents();
    expect(events[0].eventName()).toEqual('event.name.test');
    expect(events[0]['aggregateId']).toEqual('de76374c-c08a-4bf3-8c64-649a22cddc90');
  });
});
