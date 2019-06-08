import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Region} from './models/Region';

@Directive({
  selector: '[seRegion]',
})
export class RegionDirective implements OnChanges {

  @Input()
  public seRegion: Region;

  constructor(private el: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.seRegion.currentValue.equals(changes.seRegion.previousValue)) {
      this.removeBorderClasses();
      this.setBorder('north');
      this.setBorder('east');
      this.setBorder('south');
      this.setBorder('west');
    }
  }

  private setBorder(direction: string) {
    if (this.seRegion.borders[direction]) {
      this.el.nativeElement.classList.add(this.className(direction));
    }
  }

  private className(direction: string) {
    return 'd-' + direction + '--' + this.seRegion.lord;
  }

  private removeBorderClasses() {
    [...this.el.nativeElement.classList]
      .map(element => element.toString())
      .filter(className => className.startsWith('d-'))
      .forEach(className => this.el.nativeElement.classList.remove(className));
  }
}
