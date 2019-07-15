import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Lord} from './models/Lord';

// tslint:disable:no-input-rename

@Directive({
  selector: '[seCurrentLordColor]'
})
export class CurrentLordColorDirective implements OnChanges {

  @Input('seCurrentLordColor')
  public currentLord: Lord;

  constructor(private element: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.setProperty('lord', changes.currentLord.currentValue.color);
  }

  private setProperty(lord: string, color: string) {
    this.element.nativeElement.style.setProperty(`--${lord}-hue`, color);
  }
}
