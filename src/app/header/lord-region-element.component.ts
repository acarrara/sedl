import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-lord-region-element',
  templateUrl: 'lord-region-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LordRegionElementComponent {

  @Input()
  public seed: string;
  @Input()
  public quantity: number;

}
