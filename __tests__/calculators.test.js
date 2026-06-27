import { describe, expect, it } from 'vitest';
import { calculateBorrowingCapacity } from '../lib/calculateBorrowingCapacity';
import { calculateCgt } from '../lib/calculateCgt';
import { calculateDepreciation } from '../lib/calculateDepreciation';
import { calculateLvr } from '../lib/calculateLvr';
import { calculateRentalYield } from '../lib/calculateRentalYield';
import { calculateFirstHomeDutyEstimate, calculateStampDuty } from '../lib/calculateStampDuty';
import stampDutyConfig from '../config/stamp-duty.json';
describe('property calculators', () => {
    it('calculates NSW transfer duty from the current 2025/26 brackets', () => {
        expect(calculateStampDuty(800000, stampDutyConfig).duty).toBe(30412);
    });
    it('matches the Revenue NSW 2025/26 general and premium schedules', () => {
        expect(calculateStampDuty(450000, stampDutyConfig).duty).toBe(14662);
        expect(calculateStampDuty(4000000, stampDutyConfig).duty).toBe(206197);
    });
    it('calculates NSW minimum duty on low dutiable values', () => {
        const result = calculateStampDuty(1000, {
            state: 'NSW',
            thresholds: [
                { min: 0, max: 17000, base: 0, rate: 1.25, minimum: 20 }
            ],
            premiumThreshold: 3721000,
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
        expect(calculateFirstHomeDutyEstimate({ state: 'NSW', price: 800000, duty: 30412, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'NSW', price: 350000, duty: 9997, propertyType: 'vacant-land' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'VIC', price: 600000, duty: 31070, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'QLD', price: 650000, duty: 22275, propertyType: 'established-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'SA', price: 900000, duty: 43330, propertyType: 'new-home' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'TAS', price: 750000, duty: 28935, propertyType: 'established-home', transactionDate: '2026-06-30' })).toMatchObject({ duty: 0, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 500000, duty: 17765, propertyType: 'established-home', waRegion: 'metro-peel' })).toMatchObject({ duty: 0, applied: true });
    });
    it('applies the NSW first-home concession taper within the published ranges', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'NSW', price: 900000, duty: 34912, propertyType: 'established-home' })).toMatchObject({ duty: 19706, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'NSW', price: 400000, duty: 12412, propertyType: 'vacant-land' })).toMatchObject({ duty: 7221, applied: true });
    });
    it('does not apply the expiring Tasmanian exemption after 30 June 2026', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'TAS', price: 750000, duty: 28935, propertyType: 'established-home', transactionDate: '2026-07-01' })).toMatchObject({ duty: 28935, applied: false });
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
    it('applies current WA first home owner rate tables when region context is available', () => {
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 600000, duty: 22515, propertyType: 'established-home', waRegion: 'metro-peel' })).toMatchObject({ duty: 13630, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 600000, duty: 22515, propertyType: 'established-home', waRegion: 'outside-metro-peel' })).toMatchObject({ duty: 11890, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 400000, duty: 13015, propertyType: 'vacant-land', waRegion: 'metro-peel' })).toMatchObject({ duty: 7695, applied: true });
        expect(calculateFirstHomeDutyEstimate({ state: 'WA', price: 760000, duty: 30255, propertyType: 'established-home', waRegion: 'outside-metro-peel' })).toMatchObject({ duty: 30255, applied: false });
    });
    it('applies Victorian stamp duty brackets when state is VIC', () => {
        const result = calculateStampDuty(800000, { state: 'NSW', thresholds: [], premiumThreshold: 3000000, premiumRate: 7 }, 'VIC');
        expect(result).toMatchObject({ duty: 43070, state: 'VIC' });
    });
    it('applies current VIC and QLD owner-occupier home concession rates', () => {
        expect(calculateStampDuty(400000, stampDutyConfig, 'VIC', 'established-home')).toMatchObject({ duty: 16370, state: 'VIC' });
        expect(calculateStampDuty(850000, stampDutyConfig, 'QLD', 'established-home')).toMatchObject({ duty: 24100, state: 'QLD' });
        expect(calculateStampDuty(850000, stampDutyConfig, 'QLD', 'investment-property')).toMatchObject({ duty: 31275, state: 'QLD' });
    });
    it('uses current ACT owner-occupier and non-owner occupier duty tables', () => {
        expect(calculateStampDuty(750000, stampDutyConfig, 'ACT', 'established-home')).toMatchObject({ duty: 19208, state: 'ACT' });
        expect(calculateStampDuty(750000, stampDutyConfig, 'ACT', 'investment-property')).toMatchObject({ duty: 22200, state: 'ACT' });
    });
    it('uses the NT statutory formula for dutiable values up to $525,000', () => {
        expect(calculateStampDuty(500000, stampDutyConfig, 'NT')).toMatchObject({ duty: 23929, state: 'NT' });
        expect(calculateStampDuty(525000, stampDutyConfig, 'NT')).toMatchObject({ duty: 25988, state: 'NT' });
    });
    it('rounds per-$100-or-part duty brackets up to the next $100 where required', () => {
        expect(calculateStampDuty(17001, stampDutyConfig, 'NSW')).toMatchObject({ duty: 214, state: 'NSW' });
        expect(calculateStampDuty(5001, stampDutyConfig, 'QLD', 'investment-property')).toMatchObject({ duty: 2, state: 'QLD' });
        expect(calculateStampDuty(12001, stampDutyConfig, 'SA')).toMatchObject({ duty: 122, state: 'SA' });
        expect(calculateStampDuty(120001, stampDutyConfig, 'WA')).toMatchObject({ duty: 2283, state: 'WA' });
        expect(calculateStampDuty(3001, stampDutyConfig, 'TAS')).toMatchObject({ duty: 52, state: 'TAS' });
    });
    it('calculates LVR and deposit gap', () => {
        expect(calculateLvr(750000, 150000, { targetLvr: 80 })).toEqual({
            loanAmount: 600000,
            lvr: 80,
            targetDeposit: 150000,
            depositGap: 0,
            lmiApplies: false,
            risk: 'low'
        });
    });
    it('flags LMI when LVR is above 80%', () => {
        const result = calculateLvr(750000, 75000, { targetLvr: 80 });
        expect(result).toMatchObject({
            loanAmount: 675000,
            lvr: 90,
            lmiApplies: true,
            risk: 'high'
        });
        expect(result).not.toHaveProperty('lmiCostBand');
    });
    it('calculates annual rental yield', () => {
        expect(calculateRentalYield(650000, 620, 6500)).toEqual({
            grossYield: 4.96,
            netYield: 3.96,
            annualRent: 32240,
            annualExpenses: 6500,
            annualNetRent: 25740
        });
    });
    it('preserves negative annual net rent', () => {
        expect(calculateRentalYield(650000, 100, 6500).annualNetRent).toBe(-1300);
    });
    it('estimates borrowing capacity from income, expenses, rate, and term', () => {
        expect(calculateBorrowingCapacity(180000, 52000, { assessmentRate: 8.5, termYears: 30 })).toMatchObject({
            capacity: 1387000,
            monthlyRepayment: 10665
        });
    });
    it('derives the assessment rate from the entered loan rate and APRA buffer', () => {
        const result = calculateBorrowingCapacity(180000, 52000, { serviceabilityBufferPercent: 3, termYears: 30 }, 6);
        expect(result.assessmentRate).toBe(9);
        expect(result).not.toHaveProperty('exceedsSixTimesIncome');
    });
    it('applies the Australian CGT discount when eligible', () => {
        expect(calculateCgt(900000, 650000, 42000, 0.39, true).taxPayable).toBe(40560);
    });
    it('does not apply the CGT discount to a company', () => {
        expect(calculateCgt(900000, 650000, 42000, 0.39, true, 'company')).toMatchObject({
            taxableGain: 208000,
            taxPayable: 81120,
            discountApplied: false
        });
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
        expect(calculateDepreciation(420000, 40, 7, '1987-09-15')).toMatchObject({
            annualDeduction: 0,
            totalDeduction: 0,
            pre1987: true,
            note: 'This simplified capital works estimate does not include original construction beginning on or before 15 September 1987. Some earlier works, renovations, or plant and equipment may still need separate advice.'
        });
    });
    it('uses the exact ATO post-15 September 1987 capital-works eligibility date', () => {
        expect(calculateDepreciation(420000, 40, 7, '1987-09-16')).toMatchObject({
            annualDeduction: 10500,
            pre1987: false
        });
    });
});
