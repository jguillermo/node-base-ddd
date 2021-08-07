import { EventBase } from '../../Event/EventBase';

class TestEventBase extends EventBase {
  eventName(): string {
    return 'event.name.test';
  }
}

describe('TestEventBase', () => {
  it('eventName', () => {
    const object = new TestEventBase();
    expect(object.eventName()).toEqual('event.name.test');
  });
});
