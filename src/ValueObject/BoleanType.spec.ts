import { BooleanTypeImp } from './Implement/BooleanTypeImp';
import { ValueGenerator } from './base.spec';

describe('String Type', () => {
  let type: BooleanTypeImp;
  describe('constructor set values', () => {
    describe('valid boolean', () => {
      it('true', () => {
        type = new BooleanTypeImp(true);
        expect(type.value).toEqual(true);
      });
      it('false', () => {
        type = new BooleanTypeImp(false);
        expect(type.value).toEqual(false);
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new BooleanTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new BooleanTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });
    describe('set invalid value', () => {
      describe('string', () => {
        it('empty', () => {
          type = new BooleanTypeImp(ValueGenerator.valueString(''));
          expect(type.value).toEqual(false);
        });
        it('true', () => {
          type = new BooleanTypeImp(ValueGenerator.valueString('true'));
          expect(type.value).toEqual(true);
        });
        it('false', () => {
          type = new BooleanTypeImp(ValueGenerator.valueString('false'));
          expect(type.value).toEqual(false);
        });
        it('random', () => {
          type = new BooleanTypeImp(ValueGenerator.valueString('random'));
          expect(type.value).toEqual(true);
        });
      });
      describe('number', () => {
        it('positive', () => {
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(1));
          expect(type.value).toEqual(true);
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(1.1));
          expect(type.value).toEqual(true);
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(0.1));
          expect(type.value).toEqual(true);
        });

        it('negative', () => {
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(-1));
          expect(type.value).toEqual(true);
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(-1.1));
          expect(type.value).toEqual(true);
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(-0.1));
          expect(type.value).toEqual(true);
        });

        it('zero', () => {
          type = new BooleanTypeImp(ValueGenerator.valueBooleanNumber(0));
          expect(type.value).toEqual(false);
        });
      });
    });
  });
  describe('isNull', () => {
    it('null', () => {
      type = new BooleanTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new BooleanTypeImp(true);
      expect(type.isNull).toEqual(false);

      type = new BooleanTypeImp(false);
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new BooleanTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });
  describe('toString', () => {
    describe('valid boolean', () => {
      it('true', () => {
        type = new BooleanTypeImp(true);
        expect(type.toString).toEqual('true');
      });
      it('false', () => {
        type = new BooleanTypeImp(false);
        expect(type.toString).toEqual('false');
      });
    });
    describe('null value', () => {
      it('null', () => {
        type = new BooleanTypeImp();
        expect(type.toString).toEqual('');
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new BooleanTypeImp(undefined);
        expect(type.toString).toEqual('');
      });
    });
  });
});
