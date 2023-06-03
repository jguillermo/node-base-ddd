import { ValueObjectValue } from './primitive-aggregate';
import { expectTypeOf } from 'expect-type';
import { BooleanRequiredTypeImp, IdTypeImp } from '../../type';

describe('Primitives types required', () => {
  it('id primitive', () => {
    type actualPrimitives = ValueObjectValue<IdTypeImp>;
    type expectedPrimitives = string;
    expectTypeOf<actualPrimitives>().toEqualTypeOf<expectedPrimitives>();
  });
  it('boolean', () => {
    type actualPrimitives = ValueObjectValue<BooleanRequiredTypeImp>;
    type expectedPrimitives = boolean;
    expectTypeOf<actualPrimitives>().toEqualTypeOf<expectedPrimitives>();
  });
});
