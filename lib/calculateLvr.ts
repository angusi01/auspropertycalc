import type { LvrConfig } from './types';

export function calculateLvr(propertyPrice: number, deposit: number, config: LvrConfig) {
  const loanAmount = Math.max(0, propertyPrice - deposit);
  const lvr = propertyPrice > 0 ? Number(((loanAmount / propertyPrice) * 100).toFixed(2)) : 0;
  const targetDeposit = Math.round(propertyPrice * (1 - config.targetLvr / 100));

  return {
    loanAmount,
    lvr,
    targetDeposit,
    depositGap: Math.max(0, targetDeposit - deposit),
  };
}
