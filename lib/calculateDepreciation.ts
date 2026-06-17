export function calculateDepreciation(constructionCost: number, effectiveLifeYears: number, yearsHeld: number) {
  const annualDeduction = effectiveLifeYears > 0 ? constructionCost / effectiveLifeYears : 0;
  const totalDeduction = annualDeduction * Math.max(0, yearsHeld);

  return {
    annualDeduction: Math.round(annualDeduction),
    totalDeduction: Math.round(Math.min(constructionCost, totalDeduction)),
  };
}
