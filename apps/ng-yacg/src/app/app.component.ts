import { ChangeDetectionStrategy, Component } from '@angular/core';
import { json2codeService } from './services/json2code.service';

@Component({
  selector: 'yacg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
