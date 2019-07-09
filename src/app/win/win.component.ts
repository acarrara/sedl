import {AfterViewInit, ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-win',
  templateUrl: 'win.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinComponent implements AfterViewInit {

  @Input()
  public winner: Lord;

  public replay = false;
  public pause = false;
  public statistics = false;

  ngAfterViewInit(): void {
    window.location.href = '#win';
  }

  toggleReplay() {
    this.replay = !this.replay;
  }

  toggleStatistics() {
    this.statistics = !this.statistics;
  }

  togglePause() {
    this.pause = !this.pause;
  }
}
