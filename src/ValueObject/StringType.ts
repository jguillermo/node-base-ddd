import { BaseType } from './BaseType';
import validator from 'validator';
import isEmptyValidator = validator.isEmpty;
import isLengthValidator = validator.isLength;
import { StringIsLengthValidator } from './StringIsLengthValidator';

export abstract class StringType extends BaseType<string> {
  get isEmpty(): boolean {
    if (this.isNull) {
      return true;
    }
    return isEmptyValidator(<string>this.value);
  }

  get length(): number {
    if (this.isNull) {
      return 0;
    }
    return (<string>this.value).length;
  }

  isLength(param: StringIsLengthValidator): boolean {
    if (typeof param.exactly === 'number') {
      param.min = param.exactly;
      param.max = param.exactly;
    }
    return isLengthValidator(this.toString, param);
  }

  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return <string>this.value;
  }
}
