import { TotalAreaIsGreaterOrEqualThan } from '@/modules/farm/validators/total-area.validator';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe('TotalAreaIsGreaterOrEqualThan', () => {
  class Test {
    @TotalAreaIsGreaterOrEqualThan('areaA', 'areaB')
    totalArea: number;

    areaA: number;
    areaB: number;
  }

  it('should be valid when totalArea is greater or equal than areaA and areaB', async () => {
    const test = plainToClass(Test, {
      totalArea: 30,
      areaA: 15,
      areaB: 15,
    });

    await expect(validate(test)).resolves.toHaveLength(0);
  });

  it('should be invalid when totalArea is less than areaA and areaB', async () => {
    const test = plainToClass(Test, {
      totalArea: 10,
      areaA: 15,
      areaB: 15,
    });

    const errors = await validate(test);

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('totalArea');
    expect(errors[0].constraints?.totalArea).toEqual(
      'Total area must be greater than or equal to the sum of fields (areaA, areaB)',
    );
  });
});
