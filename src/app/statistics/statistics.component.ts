import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameStatistics} from '../models/GameStatistics';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'se-statistics',
  templateUrl: 'statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  public stats: GameStatistics;

  constructor(private storage: StorageService) {
  }

  ngOnInit(): void {
    const game = this.storage.load();
    this.stats = game.buildStatistics();
  }
}
