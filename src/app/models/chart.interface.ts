export interface ChartData {
  companies: Company[];
}

export interface Company {
  id: number;
  name: string;
  type: string;
  revenuePerWeek: Week;
  revenue: number;
  monthRevenue: number;
}

export interface ChartCompany {
  id: number;
  name: string;
  category: string;
  weekStats: Week;
  balance: number;
  monthBalance: number;
}

export interface Week {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}
