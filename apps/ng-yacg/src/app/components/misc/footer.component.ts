import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
  selector: 'yacg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  version = VERSION.full;
}
