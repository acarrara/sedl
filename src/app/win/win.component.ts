import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-win',
  templateUrl: 'win.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinComponent implements OnInit {

  @Input()
  public winner: Lord;

  @ViewChild('winAnchor', {static: true})
  public winAnchor: ElementRef;

  ngOnInit(): void {
    this.winAnchor.nativeElement.click();
  }
}
