import { EventBase } from '../event';
import { Primitives } from '../primitives/primitives';

export abstract class AggregateRoot<A> {
  private domainEvents: EventBase[] = [];

  protected record<T extends EventBase>(event: T) {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): EventBase[] {
    const events: EventBase[] = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  protected recordBy(eventClass: any) {
    const event = new eventClass();
    event.id = this.toPrimitives()['id'];
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): Primitives<A>;

  //abstract fromPrimitives(values: Primitives<A>): A;
}
