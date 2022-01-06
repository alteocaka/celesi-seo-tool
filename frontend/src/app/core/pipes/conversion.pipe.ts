import { Pipe, PipeTransform } from '@angular/core';
/*
Shows how many hours the user has worked in a day
 */
@Pipe({ name: 'conversionPipe' })
export class ConversionPipe implements PipeTransform {
    transform(value: number, exponent = 3600000): any {
        const newValue = (value / exponent)
        const conversion = 8 - newValue;
        if (conversion > 0) {
            return - conversion.toPrecision(2);
        }

        if (conversion < 0) {
            return + conversion.toPrecision(2) * -1;
        }

    }
}