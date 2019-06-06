import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameService} from './game.service';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private game: GameService) {
  }

  conquer(i: number) {
    this.game.conquer(i);
  }

  conquerHover(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.conquer(i);
    }
  }
}
