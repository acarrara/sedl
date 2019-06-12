import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from './game.service';

@Component({
  selector: 'se-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private static PRESS_WAIT = 500;

  public availableAction = 'Unreachable';

  private createTimeout: any;
  private settle: boolean;

  constructor(public game: GameService) {
  }

  action(i: number) {
    this.game.action(i);
    this.updateAvailableAction(i);
  }

  actionEnter(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.action(i);
    } else {
      this.updateAvailableAction(i);

    }
  }

  ngOnInit(): void {
    this.game.start();
  }

  startInteraction(i: number) {
    this.settle = false;
    this.createTimeout = setTimeout(() => {
      this.settle = true;
      this.game.settle(i);
    }, AppComponent.PRESS_WAIT);
  }

  stopInteraction(i: number) {
    if (!this.settle) {
      clearTimeout(this.createTimeout);
      this.action(i);
    }
  }

  resetInteraction() {
    clearTimeout(this.createTimeout);
  }

  private updateAvailableAction(i: number) {
    this.availableAction = this.game.currentLord().activeActionOn(i).name();
  }
}

