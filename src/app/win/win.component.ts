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

  public display = 'win';
  public pause = false;

  ngAfterViewInit(): void {
    window.location.href = '#win';
  }

  setDisplay(display: string) {
    this.display = display;
  }

  togglePause() {
    this.pause = !this.pause;
  }
}
