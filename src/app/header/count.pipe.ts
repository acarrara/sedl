import {Pipe, PipeTransform} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';

@Pipe({
  name: 'seCount',
  pure: false
})
export class CountPipe implements PipeTransform {

  transform(value: Region[], type: string, lord: Lord): any {
    return value.filter(region => region.is(type) && region.belongsTo(lord)).length;
  }

}
