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
    QLD: {
        state: 'QLD',
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
    SA: {
        state: 'SA',
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
        thresholds: [
            { min: 0, max: 260000, base: 0, rate: 0.49 },
            { min: 260000, max: 300000, base: 1274, rate: 2.2 },
            { min: 300000, max: 500000, base: 2154, rate: 3.4 },
            { min: 500000, max: 750000, base: 8954, rate: 4.32 },
            { min: 750000, max: 1000000, base: 19754, rate: 5.9 },
            { min: 1000000, max: 1455000, base: 34504, rate: 6.4 },
            { min: 1455000, max: null, base: 63624, rate: 4.54 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
    NT: {
        state: 'NT',
        thresholds: [
            { min: 0, max: 525000, base: 0, rate: 4.95 },
            { min: 525000, max: 3000000, base: 25988, rate: 4.95 },
            { min: 3000000, max: 5000000, base: 148500, rate: 5.75 },
            { min: 5000000, max: null, base: 263500, rate: 5.95 },
        ],
        premiumThreshold: Number.POSITIVE_INFINITY,
        premiumRate: 0,
    },
};
export function calculateStampDuty(price, config, state = config.state) {
    const selectedConfig = state === config.state && config.thresholds.length ? config : stateConfigs[state] ?? config;
    if (!Number.isFinite(price) || price <= 0) {
        return { duty: 0, state: selectedConfig.state, thresholds: selectedConfig.thresholds };
    }
    const bracket = selectedConfig.thresholds.find((threshold) => price > threshold.min && (threshold.max === null || price <= threshold.max));
    if (!bracket) {
        return { duty: 0, state: selectedConfig.state, thresholds: selectedConfig.thresholds };
    }
    let duty = bracket.base + ((price - bracket.min) * bracket.rate) / 100;
    if (price > selectedConfig.premiumThreshold) {
        duty += ((price - selectedConfig.premiumThreshold) * selectedConfig.premiumRate) / 100;
    }
    return { duty: Math.round(duty), state: selectedConfig.state, thresholds: selectedConfig.thresholds };
}
