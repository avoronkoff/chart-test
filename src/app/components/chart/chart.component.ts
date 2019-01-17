import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

// models
import { ChartCompany, LineChart, ChartSeries } from '@models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {
  @Input() companies: ChartCompany[];
  @Input() selected: ChartCompany;
  @Output() onItemSelected = new EventEmitter();

  public chart: LineChart;
  public seriesChart: ChartSeries[];
  public monthValue: number = 0;
  public totalValue: number = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    this.setValues(changes);
  }

  public select(): void {
    this.onItemSelected.emit(this.selected);
  }

  private setValues(changes: SimpleChanges): void {
    changes.selected && (this.selected = changes.selected.currentValue);
    changes.companies && this.setSeriesChart(changes.companies.currentValue);
  }

  private setSeriesChart(list: ChartCompany[]): void {
    this.seriesChart = list.map(company => {
      this.monthValue += company.monthBalance;
      this.totalValue += company.balance;

      return new ChartSeries(company);
    });
    this.chart = new LineChart(this.seriesChart);
  }

}
