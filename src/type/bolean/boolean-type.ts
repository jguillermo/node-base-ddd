import { AbstractType, ValueTypeNullable } from '../abstract-type';

export abstract class BooleanType extends AbstractType<ValueTypeNullable<boolean>> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return this.value ? 'true' : 'false';
  }

  protected filter(value: any): boolean | null {
    if (value === null) {
      return null;
    }
    if (typeof value === 'string') {
      if (value === 'false') {
        return false;
      }
      if (value === 'true') {
        return true;
      }
    }
    return !!value;
  }
}
