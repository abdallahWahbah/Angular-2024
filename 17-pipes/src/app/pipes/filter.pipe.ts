import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // when we add new server, the list doesn't rerender, so we tell the pipe to recalculate
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string) 
  {
    if(value.length === 0 || filterString === '') return value;

    const resultArray = [];
    for(const item of value)
    {
      if(item[propName] === filterString) resultArray.push(item);
    }
    return resultArray
  }

}
