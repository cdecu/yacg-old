import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { ModelInfo, TSPrintor } from '@yacg/core';

@Injectable({
  providedIn: 'root',
})
export class json2codeService {
  // public name = 'ng-yacg';
  // public description = 'ng-yacg demo';
  // public rootObject = new ObjectInfo('ng-yacg');
  // public sampleSize = 0;
  private ami = new ModelInfo('ng-yacg', 'MyIntf');
  private printor = new TSPrintor({});

  public $json: BehaviorSubject<string> = new BehaviorSubject('');
  public $code = this.$json.pipe(
    debounceTime(250),
    filter((x) => !!x),
    switchMap((x) =>
      of(x).pipe(
        map((x) => {
          // console.log(x);
          const y = JSON.parse(x);
          // console.log('11111');
          this.ami = new ModelInfo('ng-yacg', 'MyIntf');
          this.ami.loadJSON(y);
          // console.log('22222');
          const z = this.printor.printModel(this.ami);
          // console.log(z);
          return z;
        }),
        catchError((error) => of(error?.message ?? error)),
      ),
    ),
  );

  set data(data: string) {
    this.$json.next(data);
  }
}
