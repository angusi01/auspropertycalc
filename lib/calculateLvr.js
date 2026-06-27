export function calculateLvr(propertyPrice, deposit, config) {
    const loanAmount = Math.max(0, propertyPrice - deposit);
    const lvr = propertyPrice > 0 ? Number(((loanAmount / propertyPrice) * 100).toFixed(2)) : 0;
    const targetDeposit = Math.round(propertyPrice * (1 - config.targetLvr / 100));
    const lmiApplies = lvr > 80;
    const risk = lvr >= 90 ? 'high' : lvr > 80 ? 'medium' : 'low';
    const lmiCostBand = !lmiApplies ? '$0' : lvr >= 90 ? '$8,000-$20,000' : '$3,000-$8,000';
    return {
        loanAmount,
        lvr,
        targetDeposit,
        depositGap: Math.max(0, targetDeposit - deposit),
        lmiApplies,
        lmiCostBand,
        risk,
    };
}
