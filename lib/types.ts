export type StampDutyConfig = {
  state: string;
  thresholds: Array<{
    min: number;
    max: number | null;
    base: number;
    rate: number;
  }>;
  premiumThreshold: number;
  premiumRate: number;
};

export type BorrowingCapacityConfig = {
  assessmentRate: number;
  termYears: number;
};

export type LvrConfig = {
  targetLvr: number;
};

export type CalculatorSlug =
  | 'stamp-duty'
  | 'borrowing-capacity'
  | 'lvr'
  | 'cgt'
  | 'rental-yield'
  | 'depreciation';
