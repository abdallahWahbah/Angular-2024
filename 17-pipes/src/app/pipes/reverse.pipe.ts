import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {

  transform(value: any)
  {
    // const newValue = [];
    // for(let i = value.length - 1; i >= 0; i--)
    // {
    //   newValue.push(value[i])
    // }
    // return newValue
    return value.split("").reverse().join("");
  }

}
