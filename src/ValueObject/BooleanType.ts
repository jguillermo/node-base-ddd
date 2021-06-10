import { BaseType } from './BaseType';

export abstract class BooleanType extends BaseType<boolean> {
  get toString(): string {
    if (this.isNull) {
      return '';
    }
    return this.value ? 'true' : 'false';
  }
}
