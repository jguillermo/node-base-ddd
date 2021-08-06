import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'domainValidator', async: false })
export class DomainValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
    try {
      const vo = new args.constraints[0](value);
      return vo.isValid();
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    try {
      const vo = new args.constraints[0](args.value);
      vo.isValid();
      return `${args.property}: ${vo.validatorMessage()}`;
    } catch (e) {
      return `${args.property}: ${e.message}`;
    }
  }
}
