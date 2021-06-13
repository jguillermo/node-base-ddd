import { ValueGenerator } from './base.spec';
import { IdTypeImp } from '../../ValueObject/Implement/IdTypeImp';

const UUID_4_VALUE = 'df9ef000-21fc-4e06-b8f7-103c3a133d10';
describe('Id Type', () => {
  let type: IdTypeImp;
  describe('constructorset values', () => {
    describe('set valid string', () => {
      it('random', () => {
        const value = IdTypeImp.random();
        type = new IdTypeImp(value);
        expect(type.value).toEqual(value);
      });
      it('uuid v4', () => {
        type = new IdTypeImp(UUID_4_VALUE);
        expect(type.value).toEqual(UUID_4_VALUE);
      });
      it('uuid v5', () => {
        const value = IdTypeImp.fromValue('hello');
        type = new IdTypeImp(value);
        expect(type.value).toEqual(value);
      });
    });

    describe('set invalid value', () => {
      describe('null', () => {
        it('null', () => {
          expect(() => {
            new IdTypeImp();
          }).toThrow(`Id is required`);
        });
      });
      describe('undefined', () => {
        it('undefined equals null', () => {
          expect(() => {
            new IdTypeImp(undefined);
          }).toThrow(`Id is required`);
        });
      });

      describe('string', () => {
        it('empty', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueString(''));
          }).toThrow(`Invalid uuid value`);
        });
        it('random', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueString('random'));
          }).toThrow(`Invalid uuid value`);
        });
        it('special carateres', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueString('áéíóú'));
          }).toThrow(`Invalid uuid value`);
        });
      });
      describe('boolean', () => {
        it('true', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueBoolean(true));
          }).toThrow(`Invalid uuid value`);
        });
        it('false', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueBoolean(false));
          }).toThrow(`Invalid uuid value`);
        });
      });
      describe('number', () => {
        it('positive', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(1));
          }).toThrow(`Invalid uuid value`);
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(1.1));
          }).toThrow(`Invalid uuid value`);
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(0.1));
          }).toThrow(`Invalid uuid value`);
        });

        it('negative', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(-1));
          }).toThrow(`Invalid uuid value`);
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(-1.1));
          }).toThrow(`Invalid uuid value`);
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(-0.1));
          }).toThrow(`Invalid uuid value`);
        });

        it('zero', () => {
          expect(() => {
            new IdTypeImp(ValueGenerator.valueNumber(0));
          }).toThrow(`Invalid uuid value`);
        });
      });
    });
  });

  describe('isNull', () => {
    it('not null ', () => {
      type = new IdTypeImp(UUID_4_VALUE);
      expect(type.isNull).toEqual(false);
    });
  });

  describe('toString', () => {
    it('uuid v4', () => {
      type = new IdTypeImp(UUID_4_VALUE);
      expect(type.toString).toEqual(UUID_4_VALUE);
    });
  });
});
