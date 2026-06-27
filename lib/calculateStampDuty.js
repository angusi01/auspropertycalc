const stateConfigs = {
    VIC: {
        state: 'VIC',
        thresholds: [
            { min: 0, max: 25000, base: 0, rate: 1.4 },
            { min: 25000, max: 130000, base: 350, rate: 2.4 },
            { min: 130000, max: 960000, base: 2870, rate: 6 },
            { min: 960000, max: 2000000, base: 55200, rate: 5.5 },
            { min: 2000000, max: null, base: 110000, rate: 6.5 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    VIC_PPR: {
        state: 'VIC',
        thresholds: [
            { min: 0, max: 25000, base: 0, rate: 1.4 },
            { min: 25000, max: 130000, base: 350, rate: 2.4 },
            { min: 130000, max: 440000, base: 2870, rate: 5 },
            { min: 440000, max: 550000, base: 18370, rate: 6 },
            { min: 550000, max: 960000, base: 28070, rate: 6 },
            { min: 960000, max: 2000000, base: 55200, rate: 5.5 },
            { min: 2000000, max: null, base: 110000, rate: 6.5 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    QLD: {
        state: 'QLD',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 5000, base: 0, rate: 0 },
            { min: 5000, max: 75000, base: 0, rate: 1.5 },
            { min: 75000, max: 540000, base: 1050, rate: 3.5 },
            { min: 540000, max: 1000000, base: 17325, rate: 4.5 },
            { min: 1000000, max: null, base: 38025, rate: 5.75 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    QLD_HOME: {
        state: 'QLD',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 350000, base: 0, rate: 1 },
            { min: 350000, max: 540000, base: 3500, rate: 3.5 },
            { min: 540000, max: 1000000, base: 10150, rate: 4.5 },
            { min: 1000000, max: null, base: 30850, rate: 5.75 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    SA: {
        state: 'SA',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 12000, base: 0, rate: 1 },
            { min: 12000, max: 30000, base: 120, rate: 2 },
            { min: 30000, max: 50000, base: 480, rate: 3 },
            { min: 50000, max: 100000, base: 1080, rate: 3.5 },
            { min: 100000, max: 200000, base: 2830, rate: 4 },
            { min: 200000, max: 250000, base: 6830, rate: 4.25 },
            { min: 250000, max: 300000, base: 8955, rate: 4.75 },
            { min: 300000, max: 500000, base: 11330, rate: 5 },
            { min: 500000, max: null, base: 21330, rate: 5.5 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    WA: {
        state: 'WA',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 120000, base: 0, rate: 1.9 },
            { min: 120000, max: 150000, base: 2280, rate: 2.85 },
            { min: 150000, max: 360000, base: 3135, rate: 3.8 },
            { min: 360000, max: 725000, base: 11115, rate: 4.75 },
            { min: 725000, max: null, base: 28453, rate: 5.15 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    TAS: {
        state: 'TAS',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 3000, base: 0, rate: 0 },
            { min: 3000, max: 25000, base: 50, rate: 1.75 },
            { min: 25000, max: 75000, base: 435, rate: 2.25 },
            { min: 75000, max: 200000, base: 1560, rate: 3.5 },
            { min: 200000, max: 375000, base: 5935, rate: 4 },
            { min: 375000, max: 725000, base: 12935, rate: 4.25 },
            { min: 725000, max: null, base: 27810, rate: 4.5 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    ACT: {
        state: 'ACT',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 260000, base: 0, rate: 0.28 },
            { min: 260000, max: 300000, base: 728, rate: 2.2 },
            { min: 300000, max: 500000, base: 1608, rate: 3.4 },
            { min: 500000, max: 750000, base: 8408, rate: 4.32 },
            { min: 750000, max: 1000000, base: 19208, rate: 5.9 },
            { min: 1000000, max: 1455000, base: 33958, rate: 6.4 },
            { min: 1455000, max: null, base: 0, rate: 4.54, flatTotalRate: true },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    ACT_INVESTMENT: {
        state: 'ACT',
        roundUpToHundred: true,
        thresholds: [
            { min: 0, max: 200000, base: 0, rate: 1.2 },
            { min: 200000, max: 300000, base: 2400, rate: 2.2 },
            { min: 300000, max: 500000, base: 4600, rate: 3.4 },
            { min: 500000, max: 750000, base: 11400, rate: 4.32 },
            { min: 750000, max: 1000000, base: 22200, rate: 5.9 },
            { min: 1000000, max: 1455000, base: 36950, rate: 6.4 },
            { min: 1455000, max: null, base: 0, rate: 4.54, flatTotalRate: true },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    NT: {
        state: 'NT',
        thresholds: [
            { min: 0, max: 525000, base: 0, rate: 0, ntFormula: true },
            { min: 525000, max: 3000000, base: 25988, rate: 4.95 },
            { min: 3000000, max: 5000000, base: 148500, rate: 5.75 },
            { min: 5000000, max: null, base: 263500, rate: 5.95 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
};
export function calculateFirstHomeDutyEstimate({ state, price, duty, propertyType, waRegion = 'metro-peel', transactionDate }) {
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(duty)) {
        return { duty, applied: false, reason: '' };
    }
    const isHome = propertyType === 'new-home' || propertyType === 'established-home';
    const isVacantLand = propertyType === 'vacant-land';
    if (state === 'NSW' && isHome && price <= 800000) {
        return { duty: 0, applied: true, reason: 'NSW full first home buyer transfer duty exemption for eligible homes valued at $800,000 or less.' };
    }
    if (state === 'NSW' && isVacantLand && price <= 350000) {
        return { duty: 0, applied: true, reason: 'NSW full first home buyer transfer duty exemption for eligible vacant land valued at $350,000 or less.' };
    }
    if (state === 'NSW' && isHome && price < 1000000) {
        const dutyAtExemptionThreshold = 30412;
        return {
            duty: Math.round(duty - (dutyAtExemptionThreshold * ((1000000 - price) / 200000))),
            applied: true,
            reason: 'NSW first home buyer concessional duty tapers from the full exemption above $800,000 to the standard duty at $1,000,000.',
        };
    }
    if (state === 'NSW' && isVacantLand && price < 450000) {
        const dutyAtExemptionThreshold = 10382;
        return {
            duty: Math.round(duty - (dutyAtExemptionThreshold * ((450000 - price) / 100000))),
            applied: true,
            reason: 'NSW first home buyer concessional duty tapers from the full exemption above $350,000 to the standard duty at $450,000.',
        };
    }
    if (state === 'VIC' && (isHome || isVacantLand) && price <= 600000) {
        return { duty: 0, applied: true, reason: 'VIC full first home buyer duty exemption for eligible first homes valued up to $600,000.' };
    }
    if (state === 'VIC' && (isHome || isVacantLand) && price > 600000 && price <= 750000) {
        return {
            duty: Math.round(duty * ((price - 600000) / 150000)),
            applied: true,
            reason: 'VIC first home buyer duty concession reduces duty for eligible first homes valued from $600,001 to $750,000.',
        };
    }
    if (state === 'QLD' && (propertyType === 'new-home' || isVacantLand)) {
        return { duty: 0, applied: true, reason: 'QLD first home new home and vacant land concessions can reduce transfer duty to $0 for eligible first home buyers.' };
    }
    if (state === 'QLD' && propertyType === 'established-home' && price < 700000) {
        return { duty: 0, applied: true, reason: 'QLD first home concession can reduce duty to $0 for eligible residences under $700,000.' };
    }
    if (state === 'QLD' && propertyType === 'established-home' && price < 800000) {
        const concession = qldFirstHomeConcessionAmount(price);
        return {
            duty: Math.max(0, Math.round(calculateQldHomeConcessionDuty(price) - concession)),
            applied: true,
            reason: 'QLD first home concession applies the home concession rate, then deducts the published first home concession amount for eligible homes under $800,000.',
        };
    }
    if (state === 'QLD' && propertyType === 'established-home') {
        return {
            duty: Math.round(calculateQldHomeConcessionDuty(price)),
            applied: true,
            reason: 'QLD first home buyers of established homes still use the home concession rate when the additional first home concession amount is nil.',
        };
    }
    if (state === 'SA' && (propertyType === 'new-home' || isVacantLand)) {
        return { duty: 0, applied: true, reason: 'SA stamp duty relief can fully remove duty for eligible first home buyers purchasing a new home or vacant land to build a new home.' };
    }
    if (state === 'WA' && isHome && price <= 500000) {
        return { duty: 0, applied: true, reason: 'WA first home owner rate currently removes transfer duty for eligible first homes valued at $500,000 or less.' };
    }
    if (state === 'WA' && isHome && waRegion === 'metro-peel' && price <= 700000) {
        return {
            duty: Math.round(Math.ceil((price - 500000) / 100) * 13.63),
            applied: true,
            reason: 'WA first home owner rate applies the Metropolitan and Peel concessional rate for eligible homes from $500,001 to $700,000.',
        };
    }
    if (state === 'WA' && isHome && waRegion === 'outside-metro-peel' && price <= 750000) {
        return {
            duty: Math.round(Math.ceil((price - 500000) / 100) * 11.89),
            applied: true,
            reason: 'WA first home owner rate applies the outside Metropolitan and Peel concessional rate for eligible homes from $500,001 to $750,000.',
        };
    }
    if (state === 'WA' && isVacantLand && price <= 350000) {
        return { duty: 0, applied: true, reason: 'WA first home owner rate currently removes transfer duty for eligible vacant land valued at $350,000 or less.' };
    }
    if (state === 'WA' && isVacantLand && price <= 450000) {
        return {
            duty: Math.round(Math.ceil((price - 350000) / 100) * 15.39),
            applied: true,
            reason: 'WA first home owner rate applies the current concessional vacant land rate from $350,001 to $450,000.',
        };
    }
    if (state === 'TAS' && propertyType === 'established-home' && price <= 750000 && transactionDate >= '2024-02-18' && transactionDate <= '2026-06-30') {
        return { duty: 0, applied: true, reason: 'TAS first home buyer duty exemption applies to eligible established homes valued at $750,000 or less that settle by 30 June 2026.' };
    }
    return { duty, applied: false, reason: '' };
}
function calculateQldHomeConcessionDuty(price) {
    if (price <= 350000) return Math.ceil(price / 100);
    if (price <= 540000) return 3500 + (Math.ceil((price - 350000) / 100) * 3.5);
    if (price <= 1000000) return 10150 + (Math.ceil((price - 540000) / 100) * 4.5);
    return 30850 + (Math.ceil((price - 1000000) / 100) * 5.75);
}
function qldFirstHomeConcessionAmount(price) {
    if (price < 710000) return 17350;
    if (price < 720000) return 15615;
    if (price < 730000) return 13880;
    if (price < 740000) return 12145;
    if (price < 750000) return 10410;
    if (price < 760000) return 8675;
    if (price < 770000) return 6940;
    if (price < 780000) return 5205;
    if (price < 790000) return 3470;
    if (price < 800000) return 1735;
    return 0;
}
export function calculateStampDuty(price, config, state = config.state, propertyType = 'established-home') {
    const isOwnerOccupied = propertyType !== 'investment-property';
    const stateConfigKey = state === 'ACT' && !isOwnerOccupied
        ? 'ACT_INVESTMENT'
        : state === 'VIC' && isOwnerOccupied
            ? 'VIC_PPR'
            : state === 'QLD' && isOwnerOccupied
                ? 'QLD_HOME'
                : state;
    const selectedConfig = state === config.state && config.thresholds.length ? config : stateConfigs[stateConfigKey] ?? config;
    if (!Number.isFinite(price) || price <= 0) {
        return { duty: 0, state: selectedConfig.state, thresholds: selectedConfig.thresholds };
    }
    const bracket = selectedConfig.thresholds.find((threshold) => price > threshold.min && (threshold.max === null || price <= threshold.max));
    if (!bracket) {
        return { duty: 0, state: selectedConfig.state, thresholds: selectedConfig.thresholds };
    }
    const excess = price - bracket.min;
    const ratedExcess = selectedConfig.roundUpToHundred ? Math.ceil(excess / 100) * 100 : excess;
    let duty = bracket.base + (ratedExcess * bracket.rate) / 100;
    if (bracket.flatTotalRate) {
        duty = (price * bracket.rate) / 100;
    }
    if (bracket.ntFormula) {
        const valueInThousands = price / 1000;
        duty = (0.06571441 * valueInThousands * valueInThousands) + (15 * valueInThousands);
    }
    if (bracket.minimum) {
        duty = Math.max(bracket.minimum, duty);
    }
    if (price > selectedConfig.premiumThreshold && bracket.max !== null) {
        duty += ((price - selectedConfig.premiumThreshold) * selectedConfig.premiumRate) / 100;
    }
    return { duty: Math.round(duty), state: selectedConfig.state, thresholds: selectedConfig.thresholds };
}
