export function calculateCgt(salePrice, costBase, sellingCosts, marginalTaxRate, heldMoreThanOneYear) {
    const capitalGain = salePrice - costBase - sellingCosts;
    if (capitalGain <= 0) {
        return {
            capitalGain,
            taxableGain: 0,
            taxPayable: 0,
            note: 'This sale would result in a capital loss, not a gain. No CGT is payable.',
        };
    }
    const taxableGain = heldMoreThanOneYear ? capitalGain / 2 : capitalGain;
    return {
        capitalGain,
        taxableGain,
        taxPayable: Math.round(taxableGain * marginalTaxRate),
    };
}
