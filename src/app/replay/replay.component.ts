import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Game} from '../models/Game';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'se-replay',
  templateUrl: 'replay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayComponent implements OnInit {

  @Output()
  public stop: EventEmitter<any> = new EventEmitter();

  public game: Game;

  constructor(private storage: StorageService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.game = this.storage.load();

    this.game.applySteppedHistory(() => this.cdr.detectChanges(), () => this.stop.emit());
  }
}
