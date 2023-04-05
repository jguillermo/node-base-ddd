import { ArrayType } from './array-type';
import { NumberValidator } from '../../validator/validate/number.validator';

export class ArrayTypeNumber extends ArrayType<number> {
  protected itemValidator(item: any): boolean {
    return NumberValidator.isValid(item);
  }
}
