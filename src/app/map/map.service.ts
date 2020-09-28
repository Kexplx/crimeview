import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MapService {
  private districtClickSubject = new Subject<string>();
  districtClick$ = this.districtClickSubject.asObservable();

  onDistrictClick(code: string): void {
    this.districtClickSubject.next(code);
  }
}
