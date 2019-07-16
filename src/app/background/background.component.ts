import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'se-background',
  templateUrl: 'background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {

  public backSeeds = [
    'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w', 'h',
    'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f', 'w',
    'h', 'p', 'm', 'f', 'w', 'h', 'p', 'm', 'f',
    'w', 'h', 'p', 'm', 'f', 'w', 'h', 'p', 'm'];
}
