import { ValidatorInterface } from '../../validator';
import { StringTypeImp } from '../string';

enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class OrderTypeImp implements ValidatorInterface {
  constructor(private _field: StringTypeImp, private _direction: StringTypeImp) {}

  static create(field: string | null = null, direction: string | null = null) {
    return new OrderTypeImp(new StringTypeImp(field), new StringTypeImp(direction));
  }

  static empty() {
    return OrderTypeImp.create(null, null);
  }

  get field(): StringTypeImp {
    return this._field;
  }

  get direction(): StringTypeImp {
    return this._direction;
  }

  isEmpty() {
    return this._field.isNull && this._direction.isNull;
  }

  private validDirection(): boolean {
    if (this._direction.value === OrderDirection.ASC || this._direction.value === OrderDirection.DESC) {
      return true;
    }
    return false;
  }

  isValid(): boolean {
    if (this.isEmpty()) {
      return false;
    } else {
      if (this.field.isEmpty) {
        return false;
      }
      if (this.direction.isEmpty) {
        return false;
      }
      if (!this.validDirection()) {
        return false;
      }
    }
    return true;
  }

  validatorMessage(): string {
    let message;
    if (this.isEmpty()) {
      message = 'is required.';
    } else {
      if (this.field.isEmpty) {
        message = 'field is required.';
      }
      if (this.direction.isEmpty) {
        message = 'direction is required.';
      } else if (!this.validDirection()) {
        message = 'direction is not valid value.';
      }
    }
    return message;
  }
}
