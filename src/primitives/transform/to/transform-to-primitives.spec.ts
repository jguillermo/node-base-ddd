import {
  AggregateObjectMother,
  AggregateObjectMotherArrayNumber,
  AggregateObjectMotherArrayString,
  AggregateObjectMotherBoolean,
  AggregateObjectMotherDate,
  AggregateObjectMotherEnum,
  AggregateObjectMotherId,
  AggregateObjectMotherNotInstance,
  AggregateObjectMotherNull,
  AggregateObjectMotherNumber,
  AggregateObjectMotherString,
  AggregateObjectMotherUuid,
} from '../../../object-mother.spec';
import { getAllPropertiesFromInstanceClass, instanceToPrimitives } from './transform-to-primitives';

describe('Primitives to primitive', () => {
  it('Id', () => {
    const aggregate = new AggregateObjectMotherId();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateId: aggregate.aggregateId.value });
  });

  it('String', () => {
    const aggregate = new AggregateObjectMotherString();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateString: aggregate.aggregateString.value });
  });

  it('Boolean', () => {
    const aggregate = new AggregateObjectMotherBoolean();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateBoolean: aggregate.aggregateBoolean.value });
  });

  it('Date', () => {
    const aggregate = new AggregateObjectMotherDate();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateDate: aggregate.aggregateDate.value });
  });

  it('Number', () => {
    const aggregate = new AggregateObjectMotherNumber();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateNumber: aggregate.aggregateNumber.value });
  });

  it('Uuid', () => {
    const aggregate = new AggregateObjectMotherUuid();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateUuid: aggregate.aggregateUuid.value });
  });

  it('Enum', () => {
    const aggregate = new AggregateObjectMotherEnum();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateEnum: aggregate.aggregateEnum.value });
  });
  it('ArrayString', () => {
    const aggregate = new AggregateObjectMotherArrayString();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateArrayString: aggregate.aggregateArrayString.value });
  });
  it('ArrayNumber', () => {
    const aggregate = new AggregateObjectMotherArrayNumber();
    expect(instanceToPrimitives(aggregate)).toEqual({ aggregateArrayNumber: aggregate.aggregateArrayNumber.value });
  });
  it('Aggregate', () => {
    const aggregate = new AggregateObjectMother();
    expect(instanceToPrimitives(aggregate)).toEqual({
      aggregateId: aggregate.aggregateId.value,
      aggregateString: aggregate.aggregateString.value,
      aggregateBoolean: aggregate.aggregateBoolean.value,
      aggregateDate: aggregate.aggregateDate.value,
      aggregateNumber: aggregate.aggregateNumber.value,
      aggregateUuid: aggregate.aggregateUuid.value,
      aggregateEnum: aggregate.aggregateEnum.value,
      aggregateArrayString: aggregate.aggregateArrayString.value,
      aggregateArrayNumber: aggregate.aggregateArrayNumber.value,
    });
  });

  it('Aggregate whit null', () => {
    const aggregate = new AggregateObjectMotherNull();
    expect(instanceToPrimitives(aggregate)).toEqual({
      aggregateId: aggregate.aggregateId.value,
      aggregateString: null,
      aggregateBoolean: null,
      aggregateDate: null,
      aggregateNumber: null,
      aggregateUuid: null,
      aggregateEnum: null,
      aggregateArrayString: null,
      aggregateArrayNumber: null,
    });
  });

  it('Aggregate whit poperties not instance, todo, en javascript no se envian las propiedades que no fueron instanciadas', () => {
    const aggregate = new AggregateObjectMotherNotInstance();
    expect(instanceToPrimitives(aggregate)).toEqual({
      aggregateId: aggregate.aggregateId.value,
      // aggregateString: null,
      // aggregateBoolean: null,
      // aggregateDate: null,
      // aggregateNumber: null,
      // aggregateUuid: null,
      // aggregateEnum: null,
      // aggregateArrayString: null,
      // aggregateArrayNumber: null,
    });
  });
});

describe('getAllPropertiesFromInstanceClass_function', () => {
  test('test_allCasesCombined', () => {
    // Define test object with all possible cases
    class TestObject {
      public property1: string;
      private _property2: number;
      protected property3: boolean;
      static property4: string;
      domainEvents: any[];
      constructor() {
        this.property1 = 'test';
        this._property2 = 123;
        this.property3 = true;
        TestObject.property4 = 'static';
        this.domainEvents = [];
      }
      get property2() {
        return this._property2;
      }
      set property2(value: number) {
        this._property2 = value;
      }
    }
    const testObj = new TestObject();
    const result = getAllPropertiesFromInstanceClass(testObj);
    expect(result).toEqual(['property1', 'property2', 'property3']);
  });
  test('test_noLeadingUnderscores', () => {
    // Define test object with leading underscores
    class TestObject {
      public property1: string;
      private _property2: number;
      protected _property3: boolean;
      constructor() {
        this.property1 = 'test';
        this._property2 = 123;
        this._property3 = true;
      }
    }
    const testObj = new TestObject();
    const result = getAllPropertiesFromInstanceClass(testObj);
    expect(result).toEqual(['property1', 'property2', 'property3']);
  });
  test('test_onlyUnwantedProperties', () => {
    // Define test object with only unwanted properties
    class TestObject {
      domainEvents: any[];
      constructor() {
        this.domainEvents = [];
      }
    }
    const testObj = new TestObject();
    const result = getAllPropertiesFromInstanceClass(testObj);
    expect(result).toEqual([]);
  });
  test('test_propertiesWithNonStringValues', () => {
    // Define test object with properties with non-string values
    class TestObject {
      public property1: number;
      private _property2: boolean;
      constructor() {
        this.property1 = 123;
        this._property2 = true;
      }
      get property2() {
        return this._property2;
      }
      set property2(value: boolean) {
        this._property2 = value;
      }
    }
    const testObj = new TestObject();
    const result = getAllPropertiesFromInstanceClass(testObj);
    expect(result).toEqual(['property1', 'property2']);
  });
  test('test_propertiesWithCircularReferences', () => {
    // Define test object with properties with circular references
    class TestObject {
      public property1: any;
      constructor() {
        this.property1 = { test: 'test' };
        this.property1.circularRef = this.property1;
      }
    }
    const testObj = new TestObject();
    const result = getAllPropertiesFromInstanceClass(testObj);
    expect(result).toEqual(['property1']);
  });
});
