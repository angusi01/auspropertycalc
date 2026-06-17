import type { StampDutyConfig } from './types';

export function calculateStampDuty(price: number, config: StampDutyConfig) {
  if (!Number.isFinite(price) || price <= 0) {
    return { duty: 0, state: config.state };
  }

  const bracket = config.thresholds.find(
    (threshold) => price > threshold.min && (threshold.max === null || price <= threshold.max),
  );

  if (!bracket) {
    return { duty: 0, state: config.state };
  }

  let duty = bracket.base + ((price - bracket.min) * bracket.rate) / 100;

  if (price > config.premiumThreshold) {
    duty += ((price - config.premiumThreshold) * config.premiumRate) / 100;
  }

  return { duty: Math.round(duty), state: config.state };
}
