import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'se-world-preview',
  templateUrl: 'world-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldPreviewComponent {

  @Input()
  public world: string[];

}
