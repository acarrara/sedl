import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[seGrid]'
})
export class GridDirective implements OnInit {

  @Input()
  public seGrid: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.setProperty('--grid-dimension', this.seGrid);
  }

}
