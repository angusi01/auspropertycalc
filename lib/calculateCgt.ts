export function calculateCgt(
  salePrice: number,
  costBase: number,
  sellingCosts: number,
  marginalTaxRate: number,
  heldMoreThanOneYear: boolean,
) {
  const capitalGain = Math.max(0, salePrice - costBase - sellingCosts);
  const taxableGain = heldMoreThanOneYear ? capitalGain / 2 : capitalGain;

  return {
    capitalGain,
    taxableGain,
    taxPayable: Math.round(taxableGain * marginalTaxRate),
  };
}
