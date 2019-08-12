import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable, of } from 'rxjs';

// services
import { ChartService } from '@service';

// models
import {
  CATEGORY_LIST,
  ChartCompany,
  ChartForm,
  Company,
  CompanyChart,
  DROP_LIST_COMPANIES,
} from '@models';

// enums
import { Category } from '../../enums';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWrapperComponent implements OnDestroy {
  public categories$: Observable<string[]> = of(CATEGORY_LIST);
  public companiesList$: Observable<Company[]>;
  public companies$: Observable<ChartCompany[]>;
  public originCompanies$: Observable<ChartCompany[]>;

  public form: FormGroup = this.buildForm();
  public selectedCompany: ChartCompany;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private chartService: ChartService,
              private fb: FormBuilder) {
    this.getChartData();

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((form) => this.filterByObject(form));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterByObject(form: ChartForm): void {
    this.companies$ = this.originCompanies$
      .pipe(
        map(list => list.filter(v =>
          Object.keys(form).every(key => this.filterItem(form, key, v)))
        ),
        tap(data => this.setCurrentCompany(data))
      );
  }

  private filterItem(form: ChartForm, key: string, item: ChartCompany): boolean {
    return this.isDefaultValues(form, key) ? item[key] === form[key] : true;
  }

  private setCurrentCompany(companies: ChartCompany[]): void {
    this.selectedCompany = (this.form.get('name').value !== Category.ALLOCC) ? companies[0] : null;
  }

  private isDefaultValues(form: ChartForm, key: string): boolean {
    return (form[key] !== Category.ALLOCC) && (form[key] !== Category.ALLCAT);
  }

  private getChartData(): void {
    this.companies$ = this.chartService.getChartData()
      .pipe(
        tap(companies => this.companiesList$ = of([...DROP_LIST_COMPANIES, ...companies])),
        map((list: Company[]) => list.map(item => new CompanyChart(item))),
        tap(origin => this.originCompanies$ = of(origin)),
      );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      category: new FormControl(Category.ALLCAT),
      name: new FormControl(Category.ALLOCC)
    });
  }

}
