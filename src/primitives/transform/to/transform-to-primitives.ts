import { PrimitiveAggregate } from '../../types/primitive-aggregate';
import { AggregateRoot } from '../../../aggregate';

export function toPrimitives<T extends AggregateRoot>(aggregate: T): PrimitiveAggregate<T> {
  const properties = {};
  getAllPropertiesFromClass2(aggregate).forEach((property) => {
    properties[property] = aggregate?.[property].value;
  });
  return properties as PrimitiveAggregate<T>;
}

function getAllPropertiesFromClass2(obj: any): string[] {
  const data = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
  const dataFiltered = data.filter((item) => !['domainEvents', 'constructor'].includes(item));

  return dataFiltered.map((item) => {
    return item.startsWith('_') ? item.substring(1) : item;
  });
}
