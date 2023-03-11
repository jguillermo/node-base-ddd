import { AggregateRoot } from './';
import { EventBase } from '../event';
import { Primitives } from '../primitives/primitives';

class TestEventBase extends EventBase {
  eventName(): string {
    return 'event.aggregate';
  }
}

class TestAggregateRoot extends AggregateRoot<TestAggregateRoot> {
  fromPrimitives(values: Primitives<TestAggregateRoot>): TestAggregateRoot {
    return new TestAggregateRoot();
  }

  toPrimitives(): Primitives<TestAggregateRoot> {
    return {};
  }

  static create() {
    const aggregate = new TestAggregateRoot();
    aggregate.record(new TestEventBase());
    return aggregate;
  }
}

describe('TestAggregateRoot', () => {
  it('eventName', () => {
    const aggregate = TestAggregateRoot.create();
    const event = aggregate.pullDomainEvents();
    const eventempty = aggregate.pullDomainEvents();

    expect(event.length).toEqual(1);
    expect(eventempty.length).toEqual(0);
    expect(event[0].eventName()).toEqual('event.aggregate');
  });
});
