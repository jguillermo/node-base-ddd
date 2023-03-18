import { ValueGenerator } from '../abstract-type.spec';
import { OrderTypeImp } from './';
import { validate, Validate } from 'class-validator';
import { DomainValidator } from '../../validator';

class OrderDao {
  constructor(public field?: string, public direction?: string) {}
}

class EntityValidateTest {
  @Validate(DomainValidator, [OrderTypeImp])
  order: OrderDao;
}

describe('Paginator validator', () => {
  it('valid values', async () => {
    const object = new EntityValidateTest();
    object.order = new OrderDao('id', 'asc');
    const errors = await validate(object);
    expect(errors.length).toEqual(0);
  });
  it('field empty', async () => {
    const object = new EntityValidateTest();
    const order = new OrderDao();
    order.field = '';
    order.direction = 'asc';
    object.order = order;
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'order: field is required.' });
  });
  it('direction empty', async () => {
    const object = new EntityValidateTest();
    const order = new OrderDao();
    order.field = 'id';
    order.direction = '';
    object.order = order;
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'order: direction is required.' });
  });

  it('direction error', async () => {
    const object = new EntityValidateTest();
    const order = new OrderDao();
    order.field = 'id';
    order.direction = 'notvalue';
    object.order = order;
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'order: direction is not valid value.' });
  });

  it('direction asc', async () => {
    const object = new EntityValidateTest();
    const order = new OrderDao();
    order.field = 'id';
    order.direction = 'asc';
    object.order = order;
    const errors = await validate(object);
    expect(errors.length).toEqual(0);
  });

  it('direction desc', async () => {
    const object = new EntityValidateTest();
    const order = new OrderDao();
    order.field = 'id';
    order.direction = 'desc';
    object.order = order;
    const errors = await validate(object);
    expect(errors.length).toEqual(0);
  });

  it('null parameters', async () => {
    const object = new EntityValidateTest();
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'order: is required.' });
  });
});

describe('Order Type', () => {
  let type: OrderTypeImp;
  describe('constructorset values', () => {
    describe('empty', () => {
      it('null', () => {
        type = OrderTypeImp.empty();
        expect(type.field.value).toEqual(null);
        expect(type.direction.value).toEqual(null);
        expect(type.isEmpty()).toEqual(true);
      });
    });
    describe('valid number', () => {
      it('integer', () => {
        type = OrderTypeImp.create(ValueGenerator.valueNumber(1), ValueGenerator.valueNumber(1));
        expect(type.field.value).toEqual('1');
        expect(type.direction.value).toEqual('1');
      });
      it('float', () => {
        type = OrderTypeImp.create('1.1', '1.9');
        expect(type.field.value).toEqual('1.1');
        expect(type.direction.value).toEqual('1.9');
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = OrderTypeImp.create(null, null);
        expect(type.field.isNull).toEqual(true);
        expect(type.direction.isNull).toEqual(true);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = OrderTypeImp.create(undefined, undefined);
        expect(type.field.isNull).toEqual(true);
        expect(type.direction.isNull).toEqual(true);
      });
    });
    describe('set invalid value', () => {
      describe('boolean', () => {
        it('true', () => {
          type = OrderTypeImp.create(ValueGenerator.valueBoolean(true), ValueGenerator.valueBoolean(true));
          expect(type.field.value).toEqual('true');
          expect(type.direction.value).toEqual('true');
        });
        it('false', () => {
          type = OrderTypeImp.create(ValueGenerator.valueBoolean(false), ValueGenerator.valueBoolean(false));
          expect(type.field.value).toEqual('false');
          expect(type.direction.value).toEqual('false');
        });
      });
      describe('string', () => {
        it('empty', () => {
          type = OrderTypeImp.create(ValueGenerator.valueString(''), ValueGenerator.valueString(''));
          expect(type.field.value).toEqual('');
          expect(type.direction.value).toEqual('');
        });

        it('number positive', () => {
          type = OrderTypeImp.create(ValueGenerator.valueString('1'), ValueGenerator.valueString('1'));
          expect(type.field.value).toEqual('1');
          expect(type.direction.value).toEqual('1');
          type = OrderTypeImp.create(ValueGenerator.valueString('1.1'), ValueGenerator.valueString('1.1'));
          expect(type.field.value).toEqual('1.1');
          expect(type.direction.value).toEqual('1.1');
        });

        it('number negative', () => {
          type = OrderTypeImp.create(ValueGenerator.valueString('-1'), ValueGenerator.valueString('-1'));
          expect(type.field.value).toEqual('-1');
          expect(type.direction.value).toEqual('-1');
          type = OrderTypeImp.create(ValueGenerator.valueString('-1.1'), ValueGenerator.valueString('-1.1'));
          expect(type.field.value).toEqual('-1.1');
          expect(type.direction.value).toEqual('-1.1');
        });

        it('number Zero', () => {
          type = OrderTypeImp.create(ValueGenerator.valueString('0'), ValueGenerator.valueString('0'));
          expect(type.field.value).toEqual('0');
          expect(type.direction.value).toEqual('0');
        });

        it('random', () => {
          type = OrderTypeImp.create(ValueGenerator.valueString('random'), ValueGenerator.valueString('random'));
          expect(type.field.value).toEqual('random');
          expect(type.direction.value).toEqual('random');
        });
      });
    });
  });
  describe('isEmpty', () => {
    it('null', () => {
      type = OrderTypeImp.empty();
      expect(type.isEmpty()).toEqual(true);
    });
    it('not null ', () => {
      type = OrderTypeImp.create('id', 'asc');
      expect(type.isEmpty()).toEqual(false);
    });
    it('undefined', () => {
      type = OrderTypeImp.create(undefined, undefined);
      expect(type.isEmpty()).toEqual(true);
    });
  });
});
