import { Pipe, PipeTransform } from '@angular/core';
import { Object } from '../models/object.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(list: Object[], name: string): Object[] {
    if(name) {
      return list.filter(object => object.name.toLowerCase().includes(name.toLowerCase()));
    }
    return list;
  }

}
