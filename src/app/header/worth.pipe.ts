import {Pipe, PipeTransform} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';

@Pipe({
  name: 'seWorth',
  pure: false
})
export class WorthPipe implements PipeTransform {

  transform(value: Region[], lord: Lord): any {
    return value
      .filter(region => region.belongsTo(lord) && lord.board.reachableBy(lord, region))
      .reduce((partial, region) => partial + region.worth(), 0);
  }

}
