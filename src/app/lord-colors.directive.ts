import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Lord} from './models/Lord';

// tslint:disable:no-input-rename

@Directive({
  selector: '[seLordColors]'
})
export class LordColorsDirective implements OnChanges {

  @Input('seLordColors')
  public lords: Lord[];

  constructor(private element: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.lords) {
      changes.lords.currentValue
        .forEach(lord => this.setProperty(lord.id, lord.color));
    }
  }

  private setProperty(lord: string, color: string) {
    this.element.nativeElement.style.setProperty(`--${lord}-hue`, color);
  }
}
