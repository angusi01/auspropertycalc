export function calculateDepreciation(constructionCost, effectiveLifeYears, yearsHeld, constructionYear = new Date().getFullYear()) {
    const pre1987 = Number(constructionYear) < 1987;
    const deductionBase = pre1987 ? constructionCost * 0.2 : constructionCost;
    const annualDeduction = effectiveLifeYears > 0 ? deductionBase / effectiveLifeYears : 0;
    const totalDeduction = annualDeduction * Math.max(0, yearsHeld);
    return {
        annualDeduction: Math.round(annualDeduction),
        totalDeduction: Math.round(Math.min(deductionBase, totalDeduction)),
        tenYearTotal: Math.round(Math.min(deductionBase, annualDeduction * 10)),
        pre1987,
        note: pre1987 ? 'Properties built before September 1987 have limited capital works deductions. Your estimate will be lower.' : '',
    };
}
