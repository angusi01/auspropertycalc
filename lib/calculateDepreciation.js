export function calculateDepreciation(constructionCost, effectiveLifeYears, yearsHeld, constructionYear = new Date().getFullYear()) {
    const constructionStart = /^\d{4}$/.test(String(constructionYear))
        ? `${constructionYear}-01-01`
        : String(constructionYear);
    const pre1988 = constructionStart <= '1987-09-15';
    const deductionBase = pre1988 ? 0 : constructionCost;
    const annualDeduction = effectiveLifeYears > 0 ? deductionBase / effectiveLifeYears : 0;
    const totalDeduction = annualDeduction * Math.max(0, yearsHeld);
    return {
        annualDeduction: Math.round(annualDeduction),
        totalDeduction: Math.round(Math.min(deductionBase, totalDeduction)),
        tenYearTotal: Math.round(Math.min(deductionBase, annualDeduction * 10)),
        pre1987: pre1988,
        note: pre1988 ? 'This simplified capital works estimate does not include original construction beginning on or before 15 September 1987. Some earlier works, renovations, or plant and equipment may still need separate advice.' : '',
    };
}
