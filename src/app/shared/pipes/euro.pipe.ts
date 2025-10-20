import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return '$'+value.toFixed(2);
  }

}
