import { ChangeDetectionStrategy, Component } from '@angular/core';
import { json2codeService } from '../../services/json2code.service';

@Component({
  selector: 'yacg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  private testJSON = `{
  "name": "yacg",
  "version": "0.0.1",
  "license": "MIT",
  "author": "Carlos <carlos@decumont.be>",
  "private": false
}
`;
  public readonly cmOptions = {
    theme: 'monokai',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    autoCloseBrackets: true,
    matchBrackets: true,
  };

  constructor(public readonly json2code: json2codeService) {}

  public get jsonString() {
    // Initial Value Only Once ...
    if (this.testJSON) {
      const testJSON = this.testJSON;
      this.json2code.data = testJSON;
      this.testJSON = '';
      return testJSON;
    }
    return this.json2code.data;
  }

  public set jsonString(value: string) {
    if (value !== this.json2code.data) {
      this.json2code.data = value;
    }
  }
}
