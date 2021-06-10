export class ValueGenerator {
  static valueString(value: string): any {
    return value;
  }

  static valueBoolean(value: boolean): any {
    return value;
  }

  static valueBooleanTrue(): any {
    return ValueGenerator.valueBoolean(true);
  }

  static valueBooleanFalse(): any {
    return ValueGenerator.valueBoolean(false);
  }

  static valueBooleanNumber(value: number): any {
    return value;
  }
}

describe('String Type', () => {
  it('should be', () => {
    expect(ValueGenerator.valueString('string')).toEqual('string');
    expect(ValueGenerator.valueBooleanTrue()).toEqual(true);
    expect(ValueGenerator.valueBooleanTrue()).toEqual(true);
    expect(ValueGenerator.valueBooleanFalse()).toEqual(false);
    expect(ValueGenerator.valueBooleanNumber(0)).toEqual(0);
    expect(ValueGenerator.valueBooleanNumber(1)).toEqual(1);
  });
});
