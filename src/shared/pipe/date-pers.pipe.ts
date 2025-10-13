import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePers'
})
export class DatePersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
