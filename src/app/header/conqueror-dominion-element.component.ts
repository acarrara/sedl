import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-conqueror-dominion-element',
  templateUrl: 'conqueror-dominion-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConquerorDominionElementComponent {

  @Input()
  public seed: string;
  @Input()
  public quantity: number;

}
