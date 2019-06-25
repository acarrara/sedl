import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[sePinchAndZoom]'
})
export class PinchAndZoomDirective {

  private lastScale = 1;
  private scale = 1;
  private posX = 0;
  private posY = 0;
  private lastPosX = 0;
  private lastPosY = 0;
  private maxPosY = 0;
  private maxPosX = 0;

  constructor(private element: ElementRef) {
  }

  @HostListener('pinch', ['$event'])
  public onPinch($event: any) {
    this.scale = Math.max(.999, Math.min(this.lastScale * ($event.scale), 4));
    this.transform($event);
  }

  @HostListener('pan', ['$event'])
  public onPan($event: any) {
    this.transform($event);
  }

  @HostListener('panend')
  public onPanEnd() {
    this.lastPosX = this.posX < this.maxPosX ? this.posX : this.maxPosX;
    this.lastPosY = this.posY < this.maxPosY ? this.posY : this.maxPosY;
  }

  private transform($event: any) {
    if (this.scale !== 1) {
      this.posX = this.lastPosX + ($event.deltaX / this.scale);
      this.posY = this.lastPosY + ($event.deltaY / this.scale);
      this.maxPosX = Math.ceil((this.scale - 1) * this.element.nativeElement.clientWidth / 2);
      this.maxPosY = Math.ceil((this.scale - 1) * this.element.nativeElement.clientHeight / 2);
      if (this.posX > this.maxPosX) {
        this.posX = this.maxPosX;
      }
      if (this.posX < -this.maxPosX) {
        this.posX = -this.maxPosX;
      }
      if (this.posY > this.maxPosY) {
        this.posY = this.maxPosY;
      }
      if (this.posY < -this.maxPosY) {
        this.posY = -this.maxPosY;
      }
      this.element.nativeElement.style.transform =
        'scale3d(' + this.scale + ', ' + this.scale + ', 1) translate3d(' + this.posX + 'px,' + this.posY + 'px, 0)';
    }
  }

  @HostListener('pinchend')
  public onPinchEnd() {
    this.lastScale = this.scale;
  }

}
