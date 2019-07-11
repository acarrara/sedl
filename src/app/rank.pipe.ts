import {Pipe, PipeTransform} from '@angular/core';
import {Lord} from './models/Lord';

@Pipe({
  name: 'seRank',
  pure: false
})
export class RankPipe implements PipeTransform {

  public transform(value: Lord[], ...args: any[]): Lord[] {
    return [...value].sort((a, b) => b.worth() - a.worth());
  }

}
