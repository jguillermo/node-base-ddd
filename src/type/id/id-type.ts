import { UuidType } from '../uuid/';

export abstract class IdType extends UuidType {
  protected filter(value: any): string | null {
    if (value === null) {
      throw new Error(`is required.`);
    }
    return super.filter(value);
  }
}
