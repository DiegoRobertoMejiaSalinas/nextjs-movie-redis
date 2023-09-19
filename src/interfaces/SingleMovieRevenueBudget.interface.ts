export interface ISingleMovieRevenueBudgetResponse {
  results: ISingleMovieRevenueBudgetResults;
}

export interface ISingleMovieRevenueBudgetResults {
  _id: string;
  id: string;
  productionBudget: ProductionBudget;
  lifetimeGross: Gross;
  openingWeekendGross: OpeningWeekendGross;
  worldwideGross: Gross;
}

export interface Gross {
  total: Total;
}

export interface Total {
  amount: number;
  currency: string;
}

export interface OpeningWeekendGross {
  gross: Gross;
  weekendEndDate: Date;
}

export interface ProductionBudget {
  budget: Total;
}
