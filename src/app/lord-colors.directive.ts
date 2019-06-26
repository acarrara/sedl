import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Lord} from './models/Lord';

// tslint:disable:no-input-rename

@Directive({
  selector: '[seLordColors]'
})
export class LordColorsDirective implements OnChanges {

  @Input('lords')
  public lords: Lord[];
  @Input('currentLord')
  public currentLord: Lord;

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lords) {
      changes.lords.currentValue
        .forEach(lord => this.setProperty(lord.id, lord.color));
    }
    if (changes.currentLord) {
      this.setProperty('lord', changes.currentLord.currentValue.color);
    }
  }

  private setProperty(lord: string, color: string) {
    this.element.nativeElement.style.setProperty(`--${lord}-hue`, color);
  }
}
