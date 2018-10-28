import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';

// models
import { ChartCompany, LineChart, ChartSeries } from '../../models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() companies: ChartCompany[];
  @Input() selected: ChartCompany;
  @Output() onItemSelected = new EventEmitter();
  public chart: LineChart;
  public seriesChart: ChartSeries[];
  public monthValue: number = 0;
  public totalValue: number = 0;

  ngOnInit() {
    this.setSeriesChart(this.companies);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setSelectedCompany(changes);
    this.setCompanies(changes);
  }

  public select(): void {
    this.onItemSelected.emit(this.selected);
  }

  private setSelectedCompany(changes: SimpleChanges): void {
    if (changes.selected && !changes.selected.firstChange) {
      this.selected = changes.selected.currentValue
    }
  }

  private setCompanies(changes: SimpleChanges): void {
    if (!changes.companies.firstChange) {
      this.setSeriesChart(changes.companies.currentValue);
    }
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
