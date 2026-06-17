import { describe, expect, it } from 'vitest';
import { calculateBorrowingCapacity } from '../lib/calculateBorrowingCapacity';
import { calculateCgt } from '../lib/calculateCgt';
import { calculateDepreciation } from '../lib/calculateDepreciation';
import { calculateLvr } from '../lib/calculateLvr';
import { calculateRentalYield } from '../lib/calculateRentalYield';
import { calculateStampDuty } from '../lib/calculateStampDuty';

describe('property calculators', () => {
  it('calculates NSW transfer duty from configured brackets', () => {
    const result = calculateStampDuty(800000, {
      state: 'NSW',
      thresholds: [
        { min: 0, max: 14000, base: 0, rate: 1.25 },
        { min: 14000, max: 32000, base: 175, rate: 1.5 },
        { min: 32000, max: 85000, base: 445, rate: 1.75 },
        { min: 85000, max: 319000, base: 1372, rate: 3.5 },
        { min: 319000, max: 1064000, base: 9562, rate: 4.5 }
      ],
      premiumThreshold: 3000000,
      premiumRate: 7
    });

    expect(result.duty).toBe(31207);
  });

  it('calculates LVR and deposit gap', () => {
    expect(calculateLvr(750000, 150000, { targetLvr: 80 })).toEqual({
      loanAmount: 600000,
      lvr: 80,
      targetDeposit: 150000,
      depositGap: 0
    });
  });

  it('calculates annual rental yield', () => {
    expect(calculateRentalYield(650000, 620, 6500)).toEqual({
      grossYield: 4.96,
      netYield: 3.96,
      annualRent: 32240,
      annualExpenses: 6500
    });
  });

  it('estimates borrowing capacity from income, expenses, rate, and term', () => {
    expect(calculateBorrowingCapacity(180000, 52000, { assessmentRate: 8.5, termYears: 30 }).capacity).toBe(1387000);
  });

  it('applies the Australian CGT discount when eligible', () => {
    expect(calculateCgt(900000, 650000, 42000, 0.39, true).taxPayable).toBe(40560);
  });

  it('calculates straight line depreciation', () => {
    expect(calculateDepreciation(420000, 40, 7).annualDeduction).toBe(10500);
  });
});
