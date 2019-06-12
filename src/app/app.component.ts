import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public availableAction = 'Unreachable';

  constructor(public game: GameService) {
  }

  action(i: number, $event) {
    this.game.action(i);
    this.updateAvailableAction(i);
  }

  actionEnter(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.action(i, undefined);
    } else {
      this.updateAvailableAction(i);

    }
  }

  ngOnInit(): void {
    this.game.start();
  }

  private updateAvailableAction(i: number) {
    this.availableAction = this.game.currentLord().activeActionOn(i).name();
  }
}

