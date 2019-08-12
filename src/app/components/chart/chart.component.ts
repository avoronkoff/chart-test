import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// models
import { ChartCompany, LineChart, ChartSeries, TotalValues } from '@models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {
  @Input() companies: ChartCompany[];
  @Input() selected: ChartCompany;

  public chart: LineChart;
  public seriesChart$: Observable<ChartSeries[]>;
  public totalValues = new TotalValues();

  public ngOnChanges(changes: SimpleChanges): void {
    changes.selected && (this.selected = changes.selected.currentValue);
    changes.companies && this.updateChart(changes.companies.currentValue);
  }

  public select(): void {
    console.log(this.selected.id);
  }

  private updateChart(list: ChartCompany[]): void {
    this.seriesChart$ = of(list)
      .pipe(
        map(data => data.map(v => {
          this.totalValues.increment(v);
          return new ChartSeries(v);
        })),
        tap(chart => this.chart = new LineChart(chart))
      );
  }

}
