import {
  AggregateObjectMotherArrayNumber,
  AggregateObjectMotherArrayString,
  AggregateObjectMotherBoolean,
  AggregateObjectMotherDate,
  AggregateObjectMotherEnum,
  AggregateObjectMotherId,
  AggregateObjectMotherNumber,
  AggregateObjectMotherString,
  AggregateObjectMotherUuid,
} from '../../../object-mother.spec';
import { toPrimitives } from './transform-to-primitives';

describe('Primitives to primitive', () => {
  it('Id', () => {
    const aggregate = new AggregateObjectMotherId();
    expect(toPrimitives(aggregate)).toEqual({ aggregateId: aggregate.aggregateId.value });
  });

  it('String', () => {
    const aggregate = new AggregateObjectMotherString();
    expect(toPrimitives(aggregate)).toEqual({ aggregateString: aggregate.aggregateString.value });
  });

  it('Boolean', () => {
    const aggregate = new AggregateObjectMotherBoolean();
    expect(toPrimitives(aggregate)).toEqual({ aggregateBoolean: aggregate.aggregateBoolean.value });
  });

  it('Date', () => {
    const aggregate = new AggregateObjectMotherDate();
    expect(toPrimitives(aggregate)).toEqual({ aggregateDate: aggregate.aggregateDate.value });
  });

  it('Number', () => {
    const aggregate = new AggregateObjectMotherNumber();
    expect(toPrimitives(aggregate)).toEqual({ aggregateNumber: aggregate.aggregateNumber.value });
  });

  it('Uuid', () => {
    const aggregate = new AggregateObjectMotherUuid();
    expect(toPrimitives(aggregate)).toEqual({ aggregateUuid: aggregate.aggregateUuid.value });
  });

  it('Enum', () => {
    const aggregate = new AggregateObjectMotherEnum();
    expect(toPrimitives(aggregate)).toEqual({ aggregateEnum: aggregate.aggregateEnum.value });
  });
  it('ArrayString', () => {
    const aggregate = new AggregateObjectMotherArrayString();
    expect(toPrimitives(aggregate)).toEqual({ aggregateArrayString: aggregate.aggregateArrayString.value });
  });
  it('ArrayNumber', () => {
    const aggregate = new AggregateObjectMotherArrayNumber();
    expect(toPrimitives(aggregate)).toEqual({ aggregateArrayNumber: aggregate.aggregateArrayNumber.value });
  });
});
