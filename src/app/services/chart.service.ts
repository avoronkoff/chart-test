import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { CHART_DATA, ChartData, Company } from '../models'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chartData: ChartData = CHART_DATA;

  public getChartData(): Observable<Company[]> {
    return  of(this.chartData).pipe(
      map( data => data.companies
        .filter(company => company.monthRevenue > 0))
    );
  }
}
