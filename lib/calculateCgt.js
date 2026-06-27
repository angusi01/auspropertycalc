export function calculateCgt(salePrice, costBase, sellingCosts, marginalTaxRate, heldMoreThanOneYear, ownershipType = 'individual') {
    const capitalGain = salePrice - costBase - sellingCosts;
    if (capitalGain <= 0) {
        return {
            capitalGain,
            taxableGain: 0,
            taxPayable: 0,
            discountApplied: false,
            note: 'This sale would result in a capital loss, not a gain. No CGT is payable.',
        };
    }
    const discountApplied = heldMoreThanOneYear && ownershipType !== 'company';
    const taxableGain = discountApplied ? capitalGain / 2 : capitalGain;
    return {
        capitalGain,
        taxableGain,
        taxPayable: Math.round(taxableGain * marginalTaxRate),
        discountApplied,
    };
}
