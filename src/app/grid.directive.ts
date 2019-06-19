import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[seGrid]'
})
export class GridDirective implements OnChanges {

  @Input()
  public seGrid: number;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(): void {
    this.el.nativeElement.style.setProperty('--grid-dimension', this.seGrid);
  }

}
