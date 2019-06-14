import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';

@Component({
  selector: 'se-footer',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  @Input()
  public region: Region;
  @Input()
  public lord: Lord;

  constructor(public game: GameService) {
  }

  getLabel() {
    switch (this.region.type) {
      case 's':
        return 'settlement';
      case 'w':
        return 'water';
      case 'p':
        return 'plain';
      case 'h':
        return 'hill';
      case 'f':
        return 'forest';
      case 'm':
        return 'mountain';
      default:
        return 'Unknown';
    }
  }

  getAction() {
    return this.lord.activeActionOn(this.region);
  }

  canRun() {
    return this.lord.activeActionOn(this.region).can(this.lord, this.lord.board, this.region);
  }
}
