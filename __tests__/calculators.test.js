import { describe, expect, it } from 'vitest';
import { calculateBorrowingCapacity } from '../lib/calculateBorrowingCapacity';
import { calculateCgt } from '../lib/calculateCgt';
import { calculateDepreciation } from '../lib/calculateDepreciation';
import { calculateLvr } from '../lib/calculateLvr';
import { calculateRentalYield } from '../lib/calculateRentalYield';
import { calculateFirstHomeDutyEstimate, calculateStampDuty } from '../lib/calculateStampDuty';
import stampDutyConfig from '../config/stamp-duty.json';
describe('property calculators', () => {
    it('calculates NSW transfer duty from configured brackets', () => {
        const result = calculateStampDuty(800000, {
            state: 'NSW',
            thresholds: [
                { min: 0, max: 18000, base: 0, rate: 1.25, minimum: 20 },
                { min: 18000, max: 38000, base: 225, rate: 1.5 },
                { min: 38000, max: 103000, base: 525, rate: 1.75 },
                { min: 103000, max: 387000, base: 1662, rate: 3.5 },
                { min: 387000, max: 1290000, base: 11602, rate: 4.5 }
            ],
            premiumThreshold: 3870000,
            premiumRate: 7
        });
        expect(result.duty).toBe(30187);
    });
    it('matches the Revenue NSW 2026/2027 table for a $450,000 purchase', () => {
        const result = calculateStampDuty(450000, {
            state: 'NSW',
            thresholds: [
                { min: 0, max: 18000, base: 0, rate: 1.25, minimum: 20 },
                { min: 18000, max: 38000, base: 225, rate: 1.5 },
                { min: 38000, max: 103000, base: 525, rate: 1.75 },
                { min: 103000, max: 387000, base: 1662, rate: 3.5 },
                { min: 387000, max: 1290000, base: 11602, rate: 4.5 },
                { min: 1290000, max: 3870000, base: 52237, rate: 5.5 },
                { min: 3870000, max: null, base: 194137, rate: 7 }
            ],
            premiumThreshold: 3870000,
            premiumRate: 7
        });
        expect(result.duty).toBe(14437);
    });
    it('calculates NSW minimum duty on low dutiable values', () => {
        const result = calculateStampDuty(1000, {
            state: 'NSW',
            thresholds: [
                { min: 0, max: 18000, base: 0, rate: 1.25, minimum: 20 }
            ],
            premiumThreshold: 3870000,
            premiumRate: 7
        });
        expect(result.duty).toBe(20);
    });
    it('keeps first home buyer guidance for every state and territory', () => {
        expect(Object.keys(stampDutyConfig.firstHomeBuyerAssistanceByState).sort()).toEqual(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']);
        for (const [state, guidance] of Object.entries(stampDutyConfig.firstHomeBuyerAssistanceByState)) {
            expect(guidance.summary, state).toBeTruthy();
            expect(guidance.sourceUrl, state).toMatch(/^https:\/\//);
        }
    });
    it('applies deterministic first home buyer duty exemptions only when the form has enough context', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'NSW', price: 800000, duty: 30187, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'VIC', price: 600000, duty: 31070, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 650000, duty: 22275, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'SA', price: 900000, duty: 43330, propertyType: 'new-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'TAS', price: 750000, duty: 28935, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 600000, duty: 22515, propertyType: 'established-home' })).toMatchObject({ duty: 22515, applied: false });
    });
    it('applies VIC and QLD first home buyer reduced-duty formulas where official tables are deterministic', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'VIC', price: 700000, duty: 37070, propertyType: 'established-home' })).toMatchObject({ duty: 24713, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 730000, duty: 25875, propertyType: 'established-home' })).toMatchObject({ duty: 6555, applied: true });
    });
    it('applies QLD full first home buyer relief for eligible new homes and vacant land', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 900000, duty: 33525, propertyType: 'new-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 900000, duty: 33525, propertyType: 'vacant-land' })).toMatchObject({ duty: 0, applied: true });
    });
    it('keeps applying the QLD home concession rate after the first home deduction phases out', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 850000, duty: 31275, propertyType: 'established-home' })).toMatchObject({
            duty: 24100,
            applied: true
        });
    });
    it('applies Victorian stamp duty brackets when state is VIC', () => {
        const result = calculateStampDuty(800000, { state: 'NSW', thresholds: [], premiumThreshold: 3000000, premiumRate: 7 }, 'VIC');
        expect(result).toMatchObject({ duty: 43070, state: 'VIC' });
    });
    it('calculates LVR and deposit gap', () => {
        expect(calculateLvr(750000, 150000, { targetLvr: 80 })).toEqual({
            loanAmount: 600000,
            lvr: 80,
            targetDeposit: 150000,
            depositGap: 0,
            lmiApplies: false,
            lmiCostBand: '$0',
            risk: 'low'
        });
    });
    it('flags LMI when LVR is above 80%', () => {
        expect(calculateLvr(750000, 75000, { targetLvr: 80 })).toMatchObject({
            loanAmount: 675000,
            lvr: 90,
            lmiApplies: true,
            lmiCostBand: '$8,000-$20,000',
            risk: 'high'
        });
    });
    it('calculates annual rental yield', () => {
        expect(calculateRentalYield(650000, 620, 6500)).toEqual({
            grossYield: 4.96,
            netYield: 3.96,
            annualRent: 32240,
            annualExpenses: 6500
        });
    });
    it('estimates borrowing capacity from income, expenses, rate, and term', () => {
        expect(calculateBorrowingCapacity(180000, 52000, { assessmentRate: 8.5, termYears: 30 })).toMatchObject({
            capacity: 1387000,
            monthlyRepayment: 10665,
            exceedsSixTimesIncome: true
        });
    });
    it('applies the Australian CGT discount when eligible', () => {
        expect(calculateCgt(900000, 650000, 42000, 0.39, true).taxPayable).toBe(40560);
    });
    it('returns zero tax payable with a capital loss note', () => {
        expect(calculateCgt(600000, 650000, 42000, 0.39, true)).toMatchObject({
            capitalGain: -92000,
            taxableGain: 0,
            taxPayable: 0,
            note: 'This sale would result in a capital loss, not a gain. No CGT is payable.'
        });
    });
    it('calculates straight line depreciation', () => {
        expect(calculateDepreciation(420000, 40, 7).annualDeduction).toBe(10500);
    });
    it('does not estimate original capital works for pre-September 1987 properties', () => {
        expect(calculateDepreciation(420000, 40, 7, 1980)).toMatchObject({
            annualDeduction: 0,
            totalDeduction: 0,
            pre1987: true,
            note: 'This simplified capital works estimate does not include original construction before 15 September 1987. Renovations or plant and equipment may still need separate advice.'
        });
    });
});
