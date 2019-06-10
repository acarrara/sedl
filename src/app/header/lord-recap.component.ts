import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Lord} from '../models/Lord';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'se-lord-recap',
  templateUrl: 'lord-recap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LordRecapComponent implements OnInit, OnDestroy {

  @Input()
  lord: Lord;

  private subscription: Subscription;

  constructor(public game: GameService, private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.game.lord$.subscribe(() => this.cdr.detectChanges());
  }

}
