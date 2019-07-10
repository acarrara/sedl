import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Statistics} from '../models/Statistics';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'se-statistics',
  templateUrl: 'statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  public stats: Statistics;

  constructor(private storage: StorageService) {
  }

  ngOnInit(): void {
    const game = this.storage.load();
    this.stats = game.buildStatistics();
  }
}
