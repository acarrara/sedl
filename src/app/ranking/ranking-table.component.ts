import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'se-ranking-table',
  templateUrl: 'ranking-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingTableComponent implements OnInit, OnDestroy {

  @Input()
  public lords: Lord[];
  @Input()
  public showIndex = false;

  private subscription: Subscription;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.subscription = this.gameService.actions$.subscribe(() => this.cdr.detectChanges());
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
