import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'se-lord-statistics',
  templateUrl: 'lord-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LordStatisticsComponent implements OnInit, OnDestroy {

  @Input()
  public lord: Lord;
  @Input()
  public side: string;

  private subscription: Subscription;

  constructor(public game: GameService, private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.game.actions$.subscribe(() => this.cdr.detectChanges());
  }

}
