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

  ngAfterViewInit(): void {
    window.location.href = '#win-modal';
  }

  toggleReplay() {
    this.replay = !this.replay;
  }

  togglePause() {
    this.pause = !this.pause;
  }
}
