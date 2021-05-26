import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { json2codeService } from '../../services/json2code.service';

@Component({
  selector: 'yacg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  private _data = `[
{
  "name": "yacg",
  "version": "beta 0.0.1",
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

  public readonly Options = {
    language: 'json',
    theme: 'vs-dark',
    minimap: {
      enabled: false,
    },
  };

  constructor(public readonly json2code: json2codeService) {}

  ngOnInit(): void {
    this.json2code.data = this._data;
  }

  public get data() {
    return this._data;
  }

  public set data(value: string) {
    this._data = value;
    if (this._data !== this.json2code.data) {
      this.json2code.data = value;
    }
  }
}
