import { Pipe, PipeTransform } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Object } from '../models/object.model';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(list: Object[], event: PageEvent, pageSize: number): Object[] {
    if(!list) return;
    if(!event) {
      list = list.slice(0, pageSize);
      return list;
    }
    list = list.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    return list;
  }

}
