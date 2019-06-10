import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(public game: GameService) {
  }

  action(i: number) {
    this.game.action(i);
  }

  actionHover(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.action(i);
    }
  }

  ngOnInit(): void {
    this.game.start();
  }
}
