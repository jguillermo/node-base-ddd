import { UUIDType } from './UUIDType';

export abstract class IdType extends UUIDType {
  protected filter(value: any): string | null {
    if (value === null) {
      throw new Error(`is required.`);
    }
    return super.filter(value);
  }
}
