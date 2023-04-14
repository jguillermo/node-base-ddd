import { EventBase } from '../event';
import { Exclude } from 'class-transformer';

export abstract class AggregateRoot {
  @Exclude()
  private domainEvents: EventBase[] = [];

  protected record<T extends EventBase>(event: T) {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): EventBase[] {
    const events: EventBase[] = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  // protected recordBy(eventClass: any) {
  //   const event = plainToInstance(eventClass, this.toPrimitives()) as EventBase;
  //   this.domainEvents.push(event);
  // }
}
