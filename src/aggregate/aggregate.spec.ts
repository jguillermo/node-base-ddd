import { EventBase } from '../event';
import { Aggregate } from './aggregate';
import { IdTypeImp, StringTypeImp } from '../type';

class TestEventBase extends EventBase {
  public readonly aggregateId;
  public readonly aggregateString;
  eventName(): string {
    return 'event.aggregate';
  }
}

class TestAggregate extends Aggregate<TestAggregate> {
  private readonly aggregateId: IdTypeImp;
  private readonly aggregateString: StringTypeImp;
  constructor() {
    super();
    this.aggregateId = new IdTypeImp('de76374c-c08a-4bf3-8c64-649a22cddc90');
    this.aggregateString = new StringTypeImp('string');
  }
  static create() {
    const aggregate = new TestAggregate();
    aggregate.recordBy(TestEventBase);
    return aggregate;
  }
}

describe('TestAggregate', () => {
  it('eventName', () => {
    const aggregate = TestAggregate.create();
    const event = aggregate.pullDomainEvents();
    const eventempty = aggregate.pullDomainEvents();

    expect(event.length).toEqual(1);
    expect(eventempty.length).toEqual(0);
    expect(event[0].eventName()).toEqual('event.aggregate');
    expect(event[0]['aggregateId']).toEqual('de76374c-c08a-4bf3-8c64-649a22cddc90');
    expect(event[0]['aggregateString']).toEqual('string');
  });
});

describe('TestAggregate to primitives', () => {
  it('eventName', () => {
    const aggregate = TestAggregate.create();

    expect(aggregate.toPrimitives()).toEqual({
      aggregateId: 'de76374c-c08a-4bf3-8c64-649a22cddc90',
      aggregateString: 'string',
    });
  });
});
