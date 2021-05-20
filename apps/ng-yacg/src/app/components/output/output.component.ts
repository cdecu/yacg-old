import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yacg-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  readonly cmOptions = {
    lineNumbers: true,
    theme: 'monokai',
    mode: { name: 'pascal' },
    readOnly: true,
  };

  constructor() {}

  ngOnInit(): void {}
}
