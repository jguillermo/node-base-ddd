import { PrimitiveAggregate } from '../../types/primitive-aggregate';
import { AggregateRoot } from '../../../aggregate';

export function toPrimitives<T extends AggregateRoot>(aggregate: T): PrimitiveAggregate<T> {
  const properties = {};
  getAllPropertiesFromInstanceClass(aggregate).forEach((property) => {
    properties[property] = aggregate[property].value;
  });
  return properties as PrimitiveAggregate<T>;
}

export function getAllPropertiesFromInstanceClass(obj: any): string[] {
  const data = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
  const dataFiltered = data.filter((item) => !['domainEvents', 'constructor'].includes(item));

  const properties = dataFiltered.map((item) => {
    return item.startsWith('_') ? item.substring(1) : item;
  });

  return properties.filter((item, index) => properties.indexOf(item) === index);
}
