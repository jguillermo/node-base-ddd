import { BoleanTypeImp } from './Implement/BoleanTypeImp';

describe('String Type', () => {
  let type: BoleanTypeImp;
  describe('constructorset values', () => {
    describe('set valid string', () => {
      it('alphabet', () => {
        type = new BoleanTypeImp('abc123');
        expect(type.value).toEqual('abc123');
      });
    });
  });
});
