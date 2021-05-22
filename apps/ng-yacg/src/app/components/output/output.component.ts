import { ChangeDetectionStrategy, Component } from '@angular/core';
import { json2codeService } from '../../services/json2code.service';

@Component({
  selector: 'yacg-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputComponent {
  // TODO make dynamic printor list
  public readonly printors = ['typescript', 'pascal'];
  public readonly cmOptions: { [key: string]: any } = {
    lineNumbers: true,
    theme: 'monokai',
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    readOnly: true,
  };

  constructor(public readonly json2code: json2codeService) {
    this.initEditorOptions(this.json2code.selectedPrintor);
  }

  public get selectedPrintor(): string {
    return this.json2code.selectedPrintor;
  }
  public set selectedPrintor(value: string) {
    if (value !== this.json2code.selectedPrintor) {
      this.json2code.selectedPrintor = value;
      this.initEditorOptions(value);
    }
  }
  private initEditorOptions(value: string) {
    switch (value) {
      case 'pascal':
        this.cmOptions.mode = 'pascal';
        break;
      default:
        this.cmOptions.mode = { name: 'javascript', typescript: true };
        break;
    }
  }
}
