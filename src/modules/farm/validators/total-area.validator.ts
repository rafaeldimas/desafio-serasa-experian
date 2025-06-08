import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [string[]];
}

@ValidatorConstraint({ name: 'totalArea', async: false })
export class TotalAreaIsGreaterOrEqualThanValidator
  implements ValidatorConstraintInterface
{
  validate(totalArea: number, args: ValidationArgumentsWithConstraints) {
    const [fields] = args.constraints;

    const fieldsSummed = fields
      .map<number>((field) =>
        typeof args.object[field] === 'number' ? args.object[field] : 0,
      )
      .reduce((a, b) => a + b, 0);

    return totalArea >= fieldsSummed;
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    const [fields] = args.constraints;
    return `Total area must be greater than or equal to the sum of fields (${fields.join(', ')})`;
  }
}

export function TotalAreaIsGreaterOrEqualThan(...fields: string[]) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'totalAreaIsGreaterOrEqualThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [fields],
      validator: TotalAreaIsGreaterOrEqualThanValidator,
    });
  };
}
