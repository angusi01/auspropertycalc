import borrowingCapacityConfig from '../config/borrowing-capacity.json';
import cgtConfig from '../config/cgt.json';
import depreciationConfig from '../config/depreciation.json';
import lvrConfig from '../config/lvr.json';
import rentalYieldConfig from '../config/rental-yield.json';
import stampDutyConfig from '../config/stamp-duty.json';
import type { CalculatorSlug } from './types';

export const calculators: Record<CalculatorSlug, { title: string; description: string; config: unknown }> = {
  'stamp-duty': {
    title: 'Stamp Duty Calculator',
    description: 'Estimate NSW transfer duty from configured thresholds.',
    config: stampDutyConfig,
  },
  'borrowing-capacity': {
    title: 'Borrowing Capacity Calculator',
    description: 'Estimate borrowing capacity using income, expenses, assessment rate, and term.',
    config: borrowingCapacityConfig,
  },
  lvr: {
    title: 'LVR Calculator',
    description: 'Calculate loan-to-value ratio and the deposit needed for a target LVR.',
    config: lvrConfig,
  },
  cgt: {
    title: 'Capital Gains Tax Calculator',
    description: 'Estimate taxable gains and tax payable using a selected marginal rate.',
    config: cgtConfig,
  },
  'rental-yield': {
    title: 'Rental Yield Calculator',
    description: 'Compare gross and net yield from weekly rent and expenses.',
    config: rentalYieldConfig,
  },
  depreciation: {
    title: 'Depreciation Calculator',
    description: 'Estimate straight-line building depreciation deductions.',
    config: depreciationConfig,
  },
};

export const calculatorSlugs = Object.keys(calculators) as CalculatorSlug[];
