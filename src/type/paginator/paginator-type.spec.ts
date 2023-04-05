import { ValueGenerator } from '../abstract-type.spec';
import { PaginatorTypeImp } from './';
import { validate, Validate } from 'class-validator';
import { DomainValidator } from '../../validator/domain-validator';

class PaginatorDao {
  page?: number;
  perPage?: number;
}

class EntityValidateTest {
  @Validate(DomainValidator, [PaginatorTypeImp])
  paginator: PaginatorDao;
}

describe('Paginator validator', () => {
  it('valid number', async () => {
    const object = new EntityValidateTest();
    const paginator = new PaginatorDao();
    paginator.page = 1;
    paginator.perPage = 1;
    object.paginator = paginator;
    const errors = await validate(object);
    expect(errors.length).toEqual(0);
  });
  it('page 0', async () => {
    const object = new EntityValidateTest();
    const paginator = new PaginatorDao();
    paginator.page = 0;
    paginator.perPage = 1;
    object.paginator = paginator;
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'paginator: page must be positive.' });
  });
  it('perPage 0', async () => {
    const object = new EntityValidateTest();
    const paginator = new PaginatorDao();
    paginator.page = 1;
    paginator.perPage = 0;
    object.paginator = paginator;
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'paginator: perPage must be positive.' });
  });

  it('null parameters', async () => {
    const object = new EntityValidateTest();
    const errors = await validate(object);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ domainValidator: 'paginator: is required.' });
  });

  it('float number, should be int', async () => {
    const object = new EntityValidateTest();
    const paginator = new PaginatorDao();
    paginator.page = 1.1;
    paginator.perPage = 1.9;
    object.paginator = paginator;
    const errors = await validate(object);
    expect(errors.length).toEqual(0);
  });
});

describe('Paginator Type', () => {
  let type: PaginatorTypeImp;
  describe('constructorset values', () => {
    describe('empty', () => {
      it('null', () => {
        type = PaginatorTypeImp.empty();
        expect(type.page.value).toEqual(null);
        expect(type.perPage.value).toEqual(null);
        expect(type.isEmpty()).toEqual(true);
      });
    });
    describe('valid number', () => {
      it('integer', () => {
        type = PaginatorTypeImp.create(1, 1);
        expect(type.page.value).toEqual(1);
        expect(type.perPage.value).toEqual(1);
      });
      it('float', () => {
        type = PaginatorTypeImp.create(1.1, 1.9);
        expect(type.page.value).toEqual(1);
        expect(type.perPage.value).toEqual(2);
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = PaginatorTypeImp.create(null, null);
        expect(type.page.isNull).toEqual(true);
        expect(type.perPage.isNull).toEqual(true);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = PaginatorTypeImp.create(undefined, undefined);
        expect(type.page.isNull).toEqual(true);
        expect(type.perPage.isNull).toEqual(true);
      });
    });
    describe('set invalid value', () => {
      describe('boolean', () => {
        it('true', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueBoolean(true), ValueGenerator.valueBoolean(true));
          expect(type.page.value).toEqual(1);
          expect(type.perPage.value).toEqual(1);
        });
        it('false', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueBoolean(false), ValueGenerator.valueBoolean(false));
          expect(type.page.value).toEqual(0);
          expect(type.perPage.value).toEqual(0);
        });
      });
      describe('string', () => {
        it('empty', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueString(''), ValueGenerator.valueString(''));
          expect(type.page.value).toEqual(0);
          expect(type.perPage.value).toEqual(0);
        });

        it('number positive', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueString('1'), ValueGenerator.valueString('1'));
          expect(type.page.value).toEqual(1);
          expect(type.perPage.value).toEqual(1);
          type = PaginatorTypeImp.create(ValueGenerator.valueString('1.1'), ValueGenerator.valueString('1.1'));
          expect(type.page.value).toEqual(1);
          expect(type.perPage.value).toEqual(1);
        });

        it('number negative', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueString('-1'), ValueGenerator.valueString('-1'));
          expect(type.page.value).toEqual(-1);
          expect(type.perPage.value).toEqual(-1);
          type = PaginatorTypeImp.create(ValueGenerator.valueString('-1.1'), ValueGenerator.valueString('-1.1'));
          expect(type.page.value).toEqual(-1);
          expect(type.perPage.value).toEqual(-1);
        });

        it('number Zero', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueString('0'), ValueGenerator.valueString('0'));
          expect(type.page.value).toEqual(0);
          expect(type.perPage.value).toEqual(0);
        });

        it('random', () => {
          type = PaginatorTypeImp.create(ValueGenerator.valueString('random'), ValueGenerator.valueString('random'));
          expect(type.page.value).toEqual(0);
          expect(type.perPage.value).toEqual(0);
        });
      });
    });
  });
  describe('isEmpty', () => {
    it('null', () => {
      type = PaginatorTypeImp.create();
      expect(type.isEmpty()).toEqual(true);
    });
    it('not null ', () => {
      type = PaginatorTypeImp.create(0, 0);
      expect(type.isEmpty()).toEqual(false);
    });
    it('undefined', () => {
      type = PaginatorTypeImp.create(undefined, undefined);
      expect(type.isEmpty()).toEqual(true);
    });
  });
});
