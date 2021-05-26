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
  public readonly Options = {
    readOnly: true,
    language: 'typescript',
    theme: 'vs-dark',
    minimap: {
      enabled: false,
    },
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
        this.Options.language = 'pascal';
        break;
      default:
        this.Options.language = 'typescript';
        break;
    }
  }
}
