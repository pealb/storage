import { Pipe, PipeTransform } from '@angular/core';
import { StorageDb } from '../models/storage.model';

@Pipe({
  name: 'filterByAddress'
})
export class FilterByAddressPipe implements PipeTransform {

  transform(list: StorageDb[], address: string): unknown {
    if(address) {
      return list.filter(storage => storage.address.toLowerCase().includes(address.toLowerCase()))
    }

    return list;
  }

}
