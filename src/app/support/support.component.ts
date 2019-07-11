import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'se-support',
  templateUrl: 'support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportComponent {

  @Output()
  public selection: EventEmitter<any> = new EventEmitter(false);

  public clicked() {
    this.selection.emit(null);
  }
}
