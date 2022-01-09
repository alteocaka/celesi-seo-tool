import { Pipe, PipeTransform } from '@angular/core';
/*
Converts milliseconds to hours
 */
@Pipe({ name: 'toHours' })
export class ToHoursPipe implements PipeTransform {
  transform(value: number, exponent = 3600000): string {
    const newValue = (value/exponent).toPrecision(2)
    return newValue;
  }
}

