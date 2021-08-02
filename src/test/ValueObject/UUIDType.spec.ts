import { ValueGenerator } from './base.spec';
import { UUIDTypeImp } from '../../ValueObject/Implement/UUIDTypeImp';
import { validate as uuidValidate } from 'uuid';

const UUID_4_VALUE = 'df9ef000-21fc-4e06-b8f7-103c3a133d10';
describe('UUID Type', () => {
  let type: UUIDTypeImp;
  describe('constructorset values', () => {
    describe('set valid string', () => {
      it('random', () => {
        const value = UUIDTypeImp.random();
        type = new UUIDTypeImp(value);
        expect(type.value).toEqual(value);
      });
      it('uuid v4', () => {
        type = new UUIDTypeImp(UUID_4_VALUE);
        expect(type.value).toEqual(UUID_4_VALUE);
      });
      it('uuid v5', () => {
        const value = UUIDTypeImp.fromValue('hello');
        type = new UUIDTypeImp(value);
        expect(type.value).toEqual(value);
      });
    });
    describe('null', () => {
      it('null', () => {
        type = new UUIDTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new UUIDTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('string', () => {
        it('empty', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueString(''));
          }).toThrow(`invalid uuid value.`);
        });
        it('random', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueString('random'));
          }).toThrow(`invalid uuid value.`);
        });
        it('special carateres', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueString('áéíóú'));
          }).toThrow(`invalid uuid value.`);
        });
      });
      describe('boolean', () => {
        it('true', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueBoolean(true));
          }).toThrow(`invalid uuid value.`);
        });
        it('false', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueBoolean(false));
          }).toThrow(`invalid uuid value.`);
        });
      });
      describe('number', () => {
        it('positive', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(1.1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(0.1));
          }).toThrow(`invalid uuid value.`);
        });

        it('negative', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(-1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(-1.1));
          }).toThrow(`invalid uuid value.`);
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(-0.1));
          }).toThrow(`invalid uuid value.`);
        });

        it('zero', () => {
          expect(() => {
            new UUIDTypeImp(ValueGenerator.valueNumber(0));
          }).toThrow(`invalid uuid value.`);
        });
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new UUIDTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new UUIDTypeImp(UUID_4_VALUE);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new UUIDTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });

  describe('toString', () => {
    it('no param', () => {
      type = new UUIDTypeImp();
      expect(type.toString).toEqual('');
    });
    it('null', () => {
      type = new UUIDTypeImp(null);
      expect(type.toString).toEqual('');
    });

    it('uuid v4', () => {
      type = new UUIDTypeImp(UUID_4_VALUE);
      expect(type.toString).toEqual(UUID_4_VALUE);
    });
  });

  describe('random', () => {
    it('uuid v4', () => {
      const value = UUIDTypeImp.random();
      expect(uuidValidate(value)).toEqual(true);
    });
  });

  describe('fromValue', () => {
    it('message "hello" namespace dns default', () => {
      const value = UUIDTypeImp.fromValue('hello');
      expect(uuidValidate(value)).toEqual(true);
      expect(value).toEqual('9342d47a-1bab-5709-9869-c840b2eac501');
    });
    it('message "hello" namespace owner', () => {
      const value = UUIDTypeImp.fromValue('hello', '53b4661d-904b-41a7-906d-5892b658b2f6');
      expect(uuidValidate(value)).toEqual(true);
      expect(value).toEqual('71afd48d-b40e-5367-a007-1e7a76a3c2f1');
    });
  });
});
