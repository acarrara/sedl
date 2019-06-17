import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[sePinchAndZoom]'
})
export class PinchAndZoomDirective {

  private lastScale = 1;
  private scale: number;
  private lastPosX: number;
  private lastPosY: number;
  private maxPosY: number;
  private maxPosX: number;

  constructor(private element: ElementRef) {
  }

  @HostListener('pinch', ['$event'])
  public onPinch($event: any) {
    const scale = Math.max(.999, Math.min(this.lastScale * ($event.scale), 4));
    this.scale = scale;
    if (scale !== 1) {
      let posX = this.lastPosX + $event.deltaX;
      let posY = this.lastPosY + $event.deltaY;
      this.maxPosX = Math.ceil((scale - 1) * this.element.nativeElement.clientWidth / 2);
      this.maxPosY = Math.ceil((scale - 1) * this.element.nativeElement.clientHeight / 2);
      if (posX > this.maxPosX) {
        posX = this.maxPosX;
      }
      if (posX < -this.maxPosX) {
        posX = -this.maxPosX;
      }
      if (posY > this.maxPosY) {
        posY = this.maxPosY;
      }
      if (posY < -this.maxPosY) {
        posY = -this.maxPosY;
      }
      this.element.nativeElement.style.transform =
        'scale3d(' + scale + ', ' + scale + ', 1) translate3d(' + posX + 'px,' + posY + 'px, 0) ';
    }
  }

  @HostListener('pinchend')
  public onPinchEnd() {
    this.lastScale = this.scale;
  }

}
