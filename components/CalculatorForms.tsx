import { useMemo, useState } from 'react';
import { calculateBorrowingCapacity } from '../lib/calculateBorrowingCapacity';
import { calculateCgt } from '../lib/calculateCgt';
import { calculateDepreciation } from '../lib/calculateDepreciation';
import { calculateLvr } from '../lib/calculateLvr';
import { calculateRentalYield } from '../lib/calculateRentalYield';
import { calculateStampDuty } from '../lib/calculateStampDuty';
import type { BorrowingCapacityConfig, CalculatorSlug, LvrConfig, StampDutyConfig } from '../lib/types';

function Money({ value }: { value: number }) {
  return <strong>{new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)}</strong>;
}

export function CalculatorForm({ slug, config }: { slug: CalculatorSlug; config: unknown }) {
  switch (slug) {
    case 'stamp-duty':
      return <StampDutyForm config={config as StampDutyConfig} />;
    case 'borrowing-capacity':
      return <BorrowingCapacityForm config={config as BorrowingCapacityConfig} />;
    case 'lvr':
      return <LvrForm config={config as LvrConfig} />;
    case 'cgt':
      return <CgtForm />;
    case 'rental-yield':
      return <RentalYieldForm />;
    case 'depreciation':
      return <DepreciationForm />;
  }
}

function StampDutyForm({ config }: { config: StampDutyConfig }) {
  const [price, setPrice] = useState(800000);
  const result = useMemo(() => calculateStampDuty(price, config), [price, config]);
  return (
    <div className="form-grid">
      <label>Purchase price<input type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} /></label>
      <p>Estimated {config.state} duty: <Money value={result.duty} /></p>
    </div>
  );
}

function BorrowingCapacityForm({ config }: { config: BorrowingCapacityConfig }) {
  const [income, setIncome] = useState(180000);
  const [expenses, setExpenses] = useState(52000);
  const result = calculateBorrowingCapacity(income, expenses, config);
  return (
    <div className="form-grid">
      <label>Annual household income<input type="number" value={income} onChange={(event) => setIncome(Number(event.target.value))} /></label>
      <label>Annual expenses<input type="number" value={expenses} onChange={(event) => setExpenses(Number(event.target.value))} /></label>
      <p>Estimated capacity: <Money value={result.capacity} /></p>
    </div>
  );
}

function LvrForm({ config }: { config: LvrConfig }) {
  const [price, setPrice] = useState(750000);
  const [deposit, setDeposit] = useState(150000);
  const result = calculateLvr(price, deposit, config);
  return (
    <div className="form-grid">
      <label>Property price<input type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} /></label>
      <label>Deposit<input type="number" value={deposit} onChange={(event) => setDeposit(Number(event.target.value))} /></label>
      <p>LVR: <strong>{result.lvr}%</strong></p>
      <p>Deposit gap to {config.targetLvr}% LVR: <Money value={result.depositGap} /></p>
    </div>
  );
}

function CgtForm() {
  const [salePrice, setSalePrice] = useState(900000);
  const [costBase, setCostBase] = useState(650000);
  const [costs, setCosts] = useState(42000);
  const [discount, setDiscount] = useState(true);
  const result = calculateCgt(salePrice, costBase, costs, 0.39, discount);
  return (
    <div className="form-grid">
      <label>Sale price<input type="number" value={salePrice} onChange={(event) => setSalePrice(Number(event.target.value))} /></label>
      <label>Cost base<input type="number" value={costBase} onChange={(event) => setCostBase(Number(event.target.value))} /></label>
      <label>Selling costs<input type="number" value={costs} onChange={(event) => setCosts(Number(event.target.value))} /></label>
      <label className="check"><input type="checkbox" checked={discount} onChange={(event) => setDiscount(event.target.checked)} /> Held more than 12 months</label>
      <p>Estimated CGT: <Money value={result.taxPayable} /></p>
    </div>
  );
}

function RentalYieldForm() {
  const [price, setPrice] = useState(650000);
  const [rent, setRent] = useState(620);
  const [expenses, setExpenses] = useState(6500);
  const result = calculateRentalYield(price, rent, expenses);
  return (
    <div className="form-grid">
      <label>Property price<input type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} /></label>
      <label>Weekly rent<input type="number" value={rent} onChange={(event) => setRent(Number(event.target.value))} /></label>
      <label>Annual expenses<input type="number" value={expenses} onChange={(event) => setExpenses(Number(event.target.value))} /></label>
      <p>Gross yield: <strong>{result.grossYield}%</strong></p>
      <p>Net yield: <strong>{result.netYield}%</strong></p>
    </div>
  );
}

function DepreciationForm() {
  const [cost, setCost] = useState(420000);
  const [life, setLife] = useState(40);
  const [years, setYears] = useState(7);
  const result = calculateDepreciation(cost, life, years);
  return (
    <div className="form-grid">
      <label>Construction cost<input type="number" value={cost} onChange={(event) => setCost(Number(event.target.value))} /></label>
      <label>Effective life<input type="number" value={life} onChange={(event) => setLife(Number(event.target.value))} /></label>
      <label>Years held<input type="number" value={years} onChange={(event) => setYears(Number(event.target.value))} /></label>
      <p>Annual deduction: <Money value={result.annualDeduction} /></p>
      <p>Total deductions: <Money value={result.totalDeduction} /></p>
    </div>
  );
}
