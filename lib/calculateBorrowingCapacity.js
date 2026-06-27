export function calculateBorrowingCapacity(annualIncome, annualExpenses, config) {
    const monthlySurplus = Math.max(0, (annualIncome - annualExpenses) / 12);
    const monthlyRate = config.assessmentRate / 100 / 12;
    const months = config.termYears * 12;
    const presentValueFactor = (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;
    const rawCapacity = monthlySurplus * presentValueFactor;
    const capacity = Math.floor(rawCapacity / 1000) * 1000;
    const monthlyRepayment = capacity > 0
        ? Math.round((capacity * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)))
        : 0;
    return {
        capacity,
        monthlySurplus: Math.round(monthlySurplus),
        monthlyRepayment,
        assessmentRate: config.assessmentRate,
        exceedsSixTimesIncome: annualIncome > 0 && capacity > annualIncome * 6,
        lowIncomeWarning: annualIncome > 0 && annualIncome < 30000,
    };
}
