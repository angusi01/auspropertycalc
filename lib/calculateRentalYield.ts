export function calculateRentalYield(propertyPrice: number, weeklyRent: number, annualExpenses: number) {
  const annualRent = weeklyRent * 52;
  const grossYield = propertyPrice > 0 ? (annualRent / propertyPrice) * 100 : 0;
  const netYield = propertyPrice > 0 ? ((annualRent - annualExpenses) / propertyPrice) * 100 : 0;

  return {
    grossYield: Number(grossYield.toFixed(2)),
    netYield: Number(netYield.toFixed(2)),
    annualRent,
    annualExpenses,
  };
}
