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
        description: 'Find out how much the banks are likely to lend you based on your income, expenses, and existing debts.',
        config: borrowingCapacityConfig,
    },
    lvr: {
        title: 'LVR & LMI Calculator',
        description: "Work out your loan-to-value ratio and see whether you're likely to need lenders mortgage insurance.",
        config: lvrConfig,
    },
    cgt: {
        title: 'Capital Gains Tax Calculator',
        description: "Estimate the capital gains tax you'll owe when selling an investment property. Includes the 50% CGT discount.",
        config: cgtConfig,
    },
    'rental-yield': {
        title: 'Rental Yield Calculator',
        description: 'Work out your gross and net rental yield and compare it against market benchmarks for your area.',
        config: rentalYieldConfig,
    },
    depreciation: {
        title: 'Depreciation Calculator',
        description: 'Estimate how much you can claim in tax depreciation deductions each year on your investment property.',
        config: depreciationConfig,
    },
};
export const calculatorSlugs = Object.keys(calculators);
