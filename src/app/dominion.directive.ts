import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Dominion} from './models/Dominion';

@Directive({
  selector: '[seDominion]',
})
export class DominionDirective implements OnChanges {

  @Input()
  public seDominion: Dominion;

  constructor(private el: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.seDominion.currentValue.equals(changes.seDominion.previousValue)) {
      this.removeBorderClasses();
      this.setBorder('north');
      this.setBorder('east');
      this.setBorder('south');
      this.setBorder('west');
    }
  }

  private setBorder(direction: string) {
    if (this.seDominion.borders[direction]) {
      this.el.nativeElement.classList.add(this.className(direction));
    }
  }

  private className(direction: string) {
    return 'd-' + direction + '--' + this.seDominion.conqueror;
  }

  private removeBorderClasses() {
    [...this.el.nativeElement.classList]
      .map(element => element.toString())
      .filter(className => className.startsWith('d-'))
      .forEach(className => this.el.nativeElement.classList.remove(className));
  }
}
