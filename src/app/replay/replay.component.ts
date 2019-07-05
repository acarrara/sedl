import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StorageService} from '../storage.service';
import {Game} from '../models/Game';

@Component({
  selector: 'se-replay',
  templateUrl: 'replay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayComponent implements OnInit {

  private static STEP_INTERVAL = 500;

  @Output()
  public stop: EventEmitter<any> = new EventEmitter();

  public game: Game;

  constructor(private storage: StorageService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.game = this.storage.load();

    this.applyAction(0);
  }

  private applyAction(index: number) {
    if (index < this.game.history.length) {
      setTimeout(() => {
        const hydrated = this.game.hydrate(this.game.history[index]);
        this.game.applyHydratedAction(hydrated);
        this.applyAction(index + 1);
        this.cdr.detectChanges();
      }, ReplayComponent.STEP_INTERVAL);
    } else {
      this.stop.emit();
    }
  }
}
