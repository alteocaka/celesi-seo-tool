import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toObject',
})
export class ToObjectPipe implements PipeTransform {

  // El parametro object representa, los valores de las propiedades o indice
  transform(objects : any = []) {
    return Object.values(objects);
  }
}