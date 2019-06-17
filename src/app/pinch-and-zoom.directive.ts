import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[sePinchAndZoom]'
})
export class PinchAndZoomDirective {

  private lastScale = 1;
  private scale: number;
  private doubled;

  constructor(private element: ElementRef) {
  }

  @HostListener('pinch', ['$event'])
  public onPinch($event: any) {
    const scale = Math.max(.999, Math.min(this.lastScale * ($event.scale), 4));
    this.scale = scale;
    if (scale !== 1) {
      this.element.nativeElement.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
    }
  }

  @HostListener('pinchend')
  public onPinchEnd() {
    this.lastScale = this.scale;
  }

  @HostListener('dblclick')
  public onDoubleClick() {
    const scale = this.doubled ? 1 : 2;
    this.doubled = !this.doubled;
    this.element.nativeElement.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
  }

  @HostListener('doubletap')
  public onDoubleTap() {
    const scale = this.doubled ? 1 : 2;
    this.doubled = true;
    this.element.nativeElement.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
  }

}
