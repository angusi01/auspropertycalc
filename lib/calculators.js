import borrowingCapacityConfig from '../config/borrowing-capacity.json';
import cgtConfig from '../config/cgt.json';
import depreciationConfig from '../config/depreciation.json';
import lvrConfig from '../config/lvr.json';
import rentalYieldConfig from '../config/rental-yield.json';
import stampDutyConfig from '../config/stamp-duty.json';
export const calculators = {
    'stamp-duty': {
        title: 'Stamp Duty Calculator',
        description: 'Estimate your stamp duty costs for any Australian state or territory. Rates updated for 2026.',
        config: stampDutyConfig,
    },
    'borrowing-capacity': {
        title: 'Borrowing Capacity Calculator',
        description: 'Estimate a surplus-based borrowing limit using your after-tax income, expenses, expected loan rate, and the current APRA serviceability buffer.',
        config: borrowingCapacityConfig,
    },
    lvr: {
        title: 'LVR & LMI Calculator',
        description: "Work out your loan-to-value ratio and see whether you're likely to need lenders mortgage insurance.",
        config: lvrConfig,
    },
    cgt: {
        title: 'Capital Gains Tax Calculator',
        description: 'Estimate a property capital gain and tax using your ownership type, holding period, and entered tax rate.',
        config: cgtConfig,
    },
    'rental-yield': {
        title: 'Rental Yield Calculator',
        description: 'Work out gross and net rental yield from property value, weekly rent, and the annual expenses you enter.',
        config: rentalYieldConfig,
    },
    depreciation: {
        title: 'Depreciation Calculator',
        description: 'Estimate Division 43 capital works deductions from eligible construction expenditure and construction timing.',
        config: depreciationConfig,
    },
};
export const calculatorSlugs = Object.keys(calculators);
