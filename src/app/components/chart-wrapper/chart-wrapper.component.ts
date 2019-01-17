import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

// services
import { ChartService } from '@service';

// models
import {
  CATEGORY_LIST,
  ChartCompany,
  Company,
  CompanyChart,
  DROP_LIST_COMPANIES,
  Filter
} from '@models';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWrapperComponent implements OnDestroy {
  public companies: ChartCompany[];
  public categories: string[] = CATEGORY_LIST;
  public originCompanies: ChartCompany[];
  public dropListCompanies: Company[] = DROP_LIST_COMPANIES;
  public filter = new Filter();
  public selectedCompany: ChartCompany;

  private allOcc: string = 'All occurrences';
  private allCat: string = 'All categories';
  private destroy: Subject<void> = new Subject<void>();

  constructor(private chartService: ChartService,
              private cdr: ChangeDetectorRef) {
    this.getChartData();
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }

  public selectedItem(company: ChartCompany): void {
    console.log(company.id);
  }

  public onChange(): void {
    this.filterByObject();
    this.setCurrentCompany();
    this.cdr.detectChanges();
  }

  private filterByObject(): void {
    this.companies = this.originCompanies.filter(item =>
        Object.keys(this.filter).every(key => this.isDefaultValues(key) ? (item[key] === this.filter[key]) : true)
    );
  }

  private setCurrentCompany(): void {
    this.selectedCompany = (this.filter.name !== this.allOcc) ? this.companies[0] : null;
  }

  private isDefaultValues(key: string): boolean {
    return (this.filter[key] !== this.allOcc) && (this.filter[key] !== this.allCat);
  }

  private getChartData(): void {
    this.chartService.getChartData()
      .pipe(takeUntil(this.destroy))
      .subscribe(response => {
        this.companies = this.createCompaniesList(response);
        this.originCompanies = this.createCompaniesList(response);
        this.dropListCompanies.push(...response);
      });
  }

  private createCompaniesList(array: Company[]): ChartCompany[] {
    return array.map(item => new CompanyChart(item));
  }

}
