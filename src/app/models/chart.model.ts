import { ChartCompany, Company, Week } from './chart.interface';

export const CHART_DATA = {
  companies: [
    {
      id: 1,
      name: 'test 1',
      type: 'product',
      revenuePerWeek: {
        monday: 11,
        tuesday: 51,
        wednesday: 34,
        thursday: 120,
        friday: 10,
        saturday: 21,
        sunday: 76
      },
      revenue: 1500,
      monthRevenue: 0
    },
    {
      id: 2,
      name: 'test 2',
      type: 'auto',
      revenuePerWeek: {
        monday: 13,
        tuesday: 5,
        wednesday: 135,
        thursday: 15,
        friday: 0,
        saturday: 154,
        sunday: 20
      },
      revenue: 1600,
      monthRevenue: 345
    },
    {
      id: 3,
      name: 'test 3',
      type: 'b2b',
      revenuePerWeek: {
        monday: 111,
        tuesday: 77,
        wednesday: 36,
        thursday: 29,
        friday: 49,
        saturday: 3,
        sunday: 9
      },
      revenue: 1700,
      monthRevenue: 345
    },
    {
      id: 4,
      name: 'test 4',
      type: 'b2c',
      revenuePerWeek: {
        monday: 15,
        tuesday: 99,
        wednesday: 177,
        thursday: 163,
        friday: 85,
        saturday: 66,
        sunday: 31
      },
      revenue: 1800,
      monthRevenue: 0
    },
    {
      id: 5,
      name: 'test 5',
      type: 'product',
      revenuePerWeek: {
        monday: 45,
        tuesday: 76,
        wednesday: 86,
        thursday: 35,
        friday: 46,
        saturday: 87,
        sunday: 78
      },
      revenue: 1900,
      monthRevenue: 345
    },
    {
      id: 6,
      name: 'test 6',
      type: 'product',
      revenuePerWeek: {
        monday: 89,
        tuesday: 42,
        wednesday: 24,
        thursday: 55,
        friday: 67,
        saturday: 135,
        sunday: 26
      },
      revenue: 2000,
      monthRevenue: 345
    },
    {
      id: 7,
      name: 'test 7',
      type: 'b2b',
      revenuePerWeek: {
        monday: 200,
        tuesday: 278,
        wednesday: 69,
        thursday: 60,
        friday: 80,
        saturday: 91,
        sunday: 120
      },
      revenue: 2100,
      monthRevenue: 345
    },
    {
      id: 8,
      name: 'test 8',
      type: 'b2b',
      revenuePerWeek: {
        monday: 36,
        tuesday: 144,
        wednesday: 6,
        thursday: 38,
        friday: 22,
        saturday: 12,
        sunday: 101
      },
      revenue: 2200,
      monthRevenue: 345
    },
    {
      id: 9,
      name: 'test 9',
      type: 'product',
      revenuePerWeek: {
        monday: 30,
        tuesday: 25,
        wednesday: 22,
        thursday: 69,
        friday: 177,
        saturday: 11,
        sunday: 78
      },
      revenue: 500,
      monthRevenue: 345
    },
    {
      id: 10,
      name: 'test 10',
      type: 'auto',
      revenuePerWeek: {
        monday: 13,
        tuesday: 96,
        wednesday: 63,
        thursday: 48,
        friday: 100,
        saturday: 59,
        sunday: 109
      },
      revenue: 800,
      monthRevenue: 345
    }
  ]
};

export const DROP_LIST_COMPANIES = [
  {
    id: 0,
    name: 'All occurrences',
    type: 'none',
    revenuePerWeek: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    },
    revenue: 0,
    monthRevenue: 0
  }
];

export class CompanyChart {
  public id: number;
  public name: string;
  public category: string;
  public weekStats: Week;
  public balance: number;
  public monthBalance: number;

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.category = company.type;
    this.weekStats = company.revenuePerWeek;
    this.balance = company.revenue;
    this.monthBalance = company.monthRevenue;
  }
}

export class ChartSeries {
  public name: string;
  public data: number[] = [];

  constructor(company: ChartCompany) {
    this.name = company.name;
    Object.keys(company.weekStats).forEach(key => this.data.push(company.weekStats[key]));
  }
}

export class Filter {
  public category: string = 'All categories';
  public name: string = 'All occurrences';
}

export const categoriesList = [
  'All categories',
  'product',
  'auto',
  'b2b',
  'b2c',
];
