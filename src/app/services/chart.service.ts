import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { CHART_DATA, Company } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public getChartData(): Observable<Company[]> {
    return  of(CHART_DATA).pipe(
      map( data => data.companies.filter(company => company.monthRevenue > 0))
    );
  }
}
