import type { BorrowingCapacityConfig } from './types';

export function calculateBorrowingCapacity(
  annualIncome: number,
  annualExpenses: number,
  config: BorrowingCapacityConfig,
) {
  const monthlySurplus = Math.max(0, (annualIncome - annualExpenses) / 12);
  const monthlyRate = config.assessmentRate / 100 / 12;
  const months = config.termYears * 12;
  const presentValueFactor = (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;
  const rawCapacity = monthlySurplus * presentValueFactor;

  return {
    capacity: Math.floor(rawCapacity / 1000) * 1000,
    monthlySurplus: Math.round(monthlySurplus),
    assessmentRate: config.assessmentRate,
  };
}
