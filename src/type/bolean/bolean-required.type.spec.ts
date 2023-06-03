import { ValueGenerator } from '../abstract-type.spec';
import { BooleanRequiredTypeImp } from './';

describe('Boolean Type', () => {
  let type: BooleanRequiredTypeImp;
  describe('constructor set values', () => {
    describe('valid boolean', () => {
      it('true', () => {
        type = new BooleanRequiredTypeImp(true);
        expect(type.value).toEqual(true);
      });
      it('false', () => {
        type = new BooleanRequiredTypeImp(false);
        expect(type.value).toEqual(false);
      });
    });
    describe('null value', () => {
      it('null', () => {
        expect(() => {
          new BooleanRequiredTypeImp();
        }).toThrow(`is required.`);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        expect(() => {
          new BooleanRequiredTypeImp(undefined);
        }).toThrow(`is required.`);
      });
    });
    describe('set invalid value', () => {
      describe('string', () => {
        it('empty', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueString(''));
          expect(type.value).toEqual(false);
        });
        it('true', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueString('true'));
          expect(type.value).toEqual(true);
        });
        it('false', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueString('false'));
          expect(type.value).toEqual(false);
        });
        it('random', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueString('random'));
          expect(type.value).toEqual(true);
        });
      });
      describe('number', () => {
        it('positive', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(1));
          expect(type.value).toEqual(true);
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(1.1));
          expect(type.value).toEqual(true);
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(0.1));
          expect(type.value).toEqual(true);
        });

        it('negative', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(-1));
          expect(type.value).toEqual(true);
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(-1.1));
          expect(type.value).toEqual(true);
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(-0.1));
          expect(type.value).toEqual(true);
        });

        it('zero', () => {
          type = new BooleanRequiredTypeImp(ValueGenerator.valueNumber(0));
          expect(type.value).toEqual(false);
        });
      });
    });
  });
  describe('isNull', () => {
    it('not null ', () => {
      type = new BooleanRequiredTypeImp(true);
      expect(type.isNull).toEqual(false);

      type = new BooleanRequiredTypeImp(false);
      expect(type.isNull).toEqual(false);
    });
  });
  describe('toString', () => {
    describe('valid boolean', () => {
      it('true', () => {
        type = new BooleanRequiredTypeImp(true);
        expect(type.toString).toEqual('true');
      });
      it('false', () => {
        type = new BooleanRequiredTypeImp(false);
        expect(type.toString).toEqual('false');
      });
    });
  });
});
