export class HelperFunctions {
  toHours(hours: number) {
    return (hours / 3600000).toPrecision(2);
  }

  toConversion(value: number, exponent = 3600000): any {
    const newValue = value / exponent;
    const conversion = 8 - newValue;
    if (conversion > 0) {
      return -conversion.toPrecision(2);
    }

    if (conversion < 0) {
      return +conversion.toPrecision(2) * -1;
    }
  }
}
