import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Region} from '../models/Region';

@Component({
  selector: 'se-create',
  templateUrl: 'create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  public regions: Region[];
  public dimension = 12;

  private seed: string;

  ngOnInit(): void {
    this.regions = new Array(this.dimension * this.dimension)
      .fill(0)
      .map(() => new Region('u', 'u', false, false));
  }

  onTap(i: number) {
    this.regions[i].type = this.seed;
  }

  onEnter(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.onTap(i);
    }
  }

  currentSeed(seed: string) {
    this.seed = seed;
  }

  onPress(i: number) {
    this.regions[i].type = 's';
  }
}
