import {Pipe, PipeTransform} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';

@Pipe({
  name: 'seDebt',
  pure: false
})
export class DebtPipe implements PipeTransform {

  transform(value: Region[], lord: Lord): any {
    return value
      .filter(region => region.belongsTo(lord))
      .reduce((partial, region) => partial + (region.sustenance ? region.sustenanceCost() : 0), 0);
  }

}
