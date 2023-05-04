import { ValidatorInterface } from '../validator';

export type ValueType<T> = T | null;

export type ValueTypeNull<T> = T | null;
export type ValueTypeRequired<T> = T;

export type ValueObjectType<T> = {
  nullable: ValueTypeNull<T>;
  reuired: ValueTypeRequired<T>;
};

export abstract class AbstractType<T> implements ValidatorInterface {
  protected _value: ValueType<T>;

  constructor(value?: ValueType<T>) {
    this._value = this.filter(value ?? null);
  }

  get value(): ValueType<T> {
    return this._value;
  }

  get isNull(): boolean {
    return this._value === null;
  }

  get isNotNull(): boolean {
    return !this.isNull;
  }

  isValid(): boolean {
    return true;
  }

  validatorMessage(): string {
    return 'value ($value) is not valid.';
  }

  abstract get toString(): string;

  protected abstract filter(value: any): ValueType<T>;
}
