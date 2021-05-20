import { Component } from '@angular/core';

@Component({
  selector: 'yacg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  private data = '';

  readonly cmOptions = {
    theme: 'monokai',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    autoCloseBrackets: true,
    matchBrackets: true,
  };

  get sourceCode() {
    return this.data;
  }

  set sourceCode(value: string) {
    if (value !== this.data) {
      console.log(value);
      this.data = value;
      // this.runQuery();
    }
  }
}
