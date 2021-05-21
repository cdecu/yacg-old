import { ChangeDetectionStrategy, Component } from '@angular/core';
import { json2codeService } from '../../services/json2code.service';

@Component({
  selector: 'yacg-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputComponent {
  public readonly cmOptions = {
    lineNumbers: true,
    theme: 'monokai',
    mode: { name: 'javascript', typescript: true },
    readOnly: true,
  };

  constructor(public readonly json2code: json2codeService) {}
}
