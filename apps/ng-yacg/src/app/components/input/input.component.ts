import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { json2codeService } from '../../services/json2code.service';

@Component({
  selector: 'yacg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  private testJSON = `[
{
  "name": "yacg",
  "version": "0.0.1",
  "license": "MIT",
  "i": 123,
  "f": 123.45,
  "ii": [1,2,3,4],
  "aa": [1,2.2,"test"],
  "e" : {"name": "yacg", "yyy":2}
},
{
  "name": "yacg",
  "version": "0.0.1",
  "license": "MIT",
  "e" : {"zzz": "yacg", "yyy":1}
}
]
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

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  public get jsonString() {
    // Initial Value Only Once ...
    // because we are onPush. Data->Edit->json2codeService
    if (this.testJSON) {
      // const testJSON = this.testJSON;
      // this.json2code.data = testJSON;
      // this.testJSON = '';
      // return testJSON;
    }
    return this.json2code.data;
  }

  public set jsonString(value: string) {
    if (value !== this.json2code.data) {
      this.json2code.data = value;
    }
  }
}
