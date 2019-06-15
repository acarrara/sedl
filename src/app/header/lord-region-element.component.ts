import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-lord-statistics-element',
  templateUrl: 'lord-statistics-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LordRegionElementComponent {

  @Input()
  public seed: string;
  @Input()
  public quantity: number;

}
