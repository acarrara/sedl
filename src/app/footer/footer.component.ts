import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Region} from '../models/Region';
import {Lord} from '../models/Lord';

@Component({
  selector: 'se-footer',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  @Input()
  public region: Region;
  @Input()
  public lord: Lord;

}
