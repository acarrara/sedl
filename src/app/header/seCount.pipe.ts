import {Pipe, PipeTransform} from '@angular/core';
import {Dominion} from '../models/Dominion';

@Pipe({
  name: 'seCount',
  pure: false
})
export class CountPipe implements PipeTransform {

  transform(value: Dominion[], type: string, conqueror: string): any {
    return value.filter(dominion => dominion.type === type && dominion.conqueror === conqueror).length;
  }

}
