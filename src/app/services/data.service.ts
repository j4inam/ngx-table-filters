import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private subject = new BehaviorSubject(null);
  data$: Observable<any[]> = this.subject.asObservable();

  serverData: any[];

  constructor(private http: HttpClient) {}

  getData(): Observable<boolean> {
    return this.http.get('', { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        console.log('Res', res);
        if (res.status === 200) {
          this.subject.next(res.body);
          this.serverData = res.body;
          return true;
        }
        this.subject.next([]);
        return false;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('Get data err: ', err);
        this.subject.next([]);
        return of(false);
      })
    );
  }

  filterData(filters: any) {
    console.log('Filter in service: ', filters);
    let filteredData = [];

    if (
      (!filters.selectedNames || filters.selectedNames.length === 0) &&
      (!filters.selectedStates || filters.selectedStates.length === 0) &&
      (!filters.selectedCities || filters.selectedCities.length === 0) &&
      (!filters.selectedTypes || filters.selectedTypes.length === 0)
    ) {
      this.subject.next(this.serverData);
    }

    if (filters.selectedNames && filters.selectedNames.length > 0) {
      filters.selectedNames.forEach((name: string) => {
        filteredData = _.concat(
          filteredData,
          _.filter(this.serverData, (data: any) => data.name === name)
        );
      });
    }

    if (filters.selectedStates && filters.selectedStates.length > 0) {
      filters.selectedStates.forEach((state: string) => {
        filteredData = _.concat(
          filteredData,
          _.filter(this.serverData, (data: any) => data.state === state)
        );
      });
    }

    if (filters.selectedCities && filters.selectedCities.length > 0) {
      filters.selectedCities.forEach((city: string) => {
        filteredData = _.concat(
          filteredData,
          _.filter(this.serverData, (data: any) => data.city === city)
        );
      });
    }

    console.log("Filtered data: ", filteredData)
    this.subject.next(_.cloneDeep(filteredData));
  }

  resetFilteredData() {
    this.subject.next(this.serverData);
  }
}
