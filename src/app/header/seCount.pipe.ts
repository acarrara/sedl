import {Pipe, PipeTransform} from '@angular/core';
import {Region} from '../models/Region';

@Pipe({
  name: 'seCount',
  pure: false
})
export class CountPipe implements PipeTransform {

  transform(value: Region[], type: string, lord: string): any {
    return value.filter(region => region.type === type && region.lord === lord).length;
  }

}
