import { Validate, validate } from 'class-validator';
import { StringType } from '../type';
import { ValidatorInterface, DomainValidator } from './';

class PropertieValidateTest extends StringType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('not null');
    }
    if ('123' === this.value) {
      throw new Error('not value 123');
    }
    if ('789' === this.value) {
      return false;
    }
    return true;
  }
}

class EntityValidateTest {
  @Validate(DomainValidator, [PropertieValidateTest])
  id: string;
}

export class CompanyAddress implements ValidatorInterface {
  constructor(private _number: string, private _street: string) {}

  static create(data: any) {
    return new CompanyAddress(data?.number, data?.street);
  }

  isValid(): boolean {
    return true;
  }

  validatorMessage(): string {
    return 'value ($value) is not valid.';
  }
}

class CompanyAddressCreateInput {
  street: string;
  number: string;
}

export class CompanyPersistDto {
  @Validate(DomainValidator, [CompanyAddress])
  address: CompanyAddressCreateInput;
}

describe('validate DomainValidator PropertieValidateTest', () => {
  describe('primitive properties', () => {
    it('null', async () => {
      const object = new EntityValidateTest();
      const errors = await validate(object);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ domainValidator: 'id: not null' });
    });
    it('invalid value 123', async () => {
      const object = new EntityValidateTest();
      object.id = '123';
      const errors = await validate(object);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ domainValidator: 'id: not value 123' });
    });
    it('valid value', async () => {
      const object = new EntityValidateTest();
      object.id = 'valid value';
      const errors = await validate(object);
      expect(errors.length).toEqual(0);
    });
    it('invalid value default message error', async () => {
      const object = new EntityValidateTest();
      object.id = '789';
      const errors = await validate(object);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ domainValidator: 'id: value (789) is not valid.' });
    });
  });
  describe('class embebed', () => {
    it('address vo', async () => {
      const object = new CompanyPersistDto();
      object.address = {
        number: '123',
        street: '456',
      };
      const errors = await validate(object);
      expect(errors.length).toEqual(0);
    });
  });
});
