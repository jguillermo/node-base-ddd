import { ValueGenerator } from './base.spec';
import { DateTypeImp } from '../../ValueObject/Implement/DateTypeImp';

describe('String Type', () => {
  let type: DateTypeImp;
  describe('constructorset values', () => {
    describe('set valid string date', () => {
      it('ISO 8601 complete', () => {
        type = new DateTypeImp('2018-03-23T16:02:15.000Z');
        expect(type.value).toEqual('2018-03-23T16:02:15.000Z');
      });
      it('ISO 8601 partial', () => {
        type = new DateTypeImp('2018-03-23');
        expect(type.value).toEqual('2018-03-23T00:00:00.000Z');
      });
      it('ISO 8601 no time zone T', () => {
        type = new DateTypeImp('2018-03-23 16:02:15.000Z');
        expect(type.value).toEqual('2018-03-23T16:02:15.000Z');
      });
      it('ISO 8601 no time zone Z', () => {
        type = new DateTypeImp('2018-03-23T16:02:15');
        expect(type.value).toEqual('2018-03-23T16:02:15.000Z');
      });
      it('ISO 8601 no time zone T and Z', () => {
        type = new DateTypeImp('2018-03-23 16:02:15');
        expect(type.value).toEqual('2018-03-23T16:02:15.000Z');
      });
      it('ISO 8601 no time zone T and Z zero time', () => {
        type = new DateTypeImp('2018-03-23 00:00:00');
        expect(type.value).toEqual('2018-03-23T00:00:00.000Z');
      });
    });
    describe('null', () => {
      it('null', () => {
        type = new DateTypeImp();
        expect(type.value).toEqual(null);
      });
    });
    describe('undefined', () => {
      it('undefined equals null', () => {
        type = new DateTypeImp(undefined);
        expect(type.value).toEqual(null);
      });
    });

    describe('set invalid value date', () => {
      describe('date error', () => {
        it('day', () => {
          expect(() => {
            new DateTypeImp('2018-03-33T16:02:15.000Z');
          }).toThrow(`Date is not valid`);
        });
        it('month', () => {
          expect(() => {
            new DateTypeImp('2018-13-23T16:02:15.000Z');
          }).toThrow(`Date is not valid`);
        });
        it('year', () => {
          expect(() => {
            new DateTypeImp('1-03-23T16:02:15.000Z');
          }).toThrow(`Date is not valid`);
        });
        it('hour', () => {
          expect(() => {
            new DateTypeImp('2018-03-23T25:02:15.000Z');
          }).toThrow(`Date is not valid`);
        });
        it('minutes', () => {
          expect(() => {
            new DateTypeImp('2018-03-23T15:61:15.000Z');
          }).toThrow(`Date is not valid`);
        });
        it('seconds', () => {
          expect(() => {
            new DateTypeImp('2018-03-23T15:02:61.000Z');
          }).toThrow(`Date is not valid`);
        });
        it.skip('only time', () => {
          expect(() => {
            new DateTypeImp('15:02:61');
          }).toThrow(`Date is not valid`);
        });
      });
      describe('string', () => {
        it('Empty', () => {
          expect(() => {
            new DateTypeImp('');
          }).toThrow(`Date is not valid`);
        });
        it('randoem string', () => {
          expect(() => {
            new DateTypeImp('abc');
          }).toThrow(`Date is not valid`);
          expect(() => {
            new DateTypeImp('áéíóú');
          }).toThrow(`Date is not valid`);
        });
      });
      describe('boolean', () => {
        it('true', () => {
          expect(() => {
            new DateTypeImp(ValueGenerator.valueBoolean(true));
          }).toThrow(`Date is not valid`);
        });
        it('false', () => {
          expect(() => {
            new DateTypeImp(ValueGenerator.valueBoolean(false));
          }).toThrow(`Date is not valid`);
        });
      });
      describe('number', () => {
        it('positive', () => {
          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(1));
          }).toThrow(`Date is not valid`);

          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(1.1));
          }).toThrow(`Date is not valid`);

          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(0.1));
          }).toThrow(`Date is not valid`);
        });

        it('negative', () => {
          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(-1));
          }).toThrow(`Date is not valid`);
          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(-1.1));
          }).toThrow(`Date is not valid`);
          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(-0.1));
          }).toThrow(`Date is not valid`);
        });

        it('zero', () => {
          expect(() => {
            new DateTypeImp(ValueGenerator.valueNumber(0));
          }).toThrow(`Date is not valid`);
        });
      });
    });
  });

  describe('isNull', () => {
    it('null', () => {
      type = new DateTypeImp();
      expect(type.isNull).toEqual(true);
    });
    it('not null ', () => {
      type = new DateTypeImp('2018-03-23T16:02:15.000Z');
      expect(type.isNull).toEqual(false);
    });
    it('undefined', () => {
      type = new DateTypeImp(undefined);
      expect(type.isNull).toEqual(true);
    });
  });

  describe('toString', () => {
    it('no param', () => {
      type = new DateTypeImp();
      expect(type.toString).toEqual('');
    });
    it('null', () => {
      type = new DateTypeImp(null);
      expect(type.toString).toEqual('');
    });
    it('ISO', () => {
      type = new DateTypeImp('2018-03-23T16:02:15.000Z');
      expect(type.toString).toEqual('2018-03-23T16:02:15.000Z');
    });
  });
});