import { useEffect, useMemo, useState } from 'react';
import { calculateBorrowingCapacity } from '../lib/calculateBorrowingCapacity';
import { calculateCgt } from '../lib/calculateCgt';
import { calculateDepreciation } from '../lib/calculateDepreciation';
import { calculateLvr } from '../lib/calculateLvr';
import { calculateRentalYield } from '../lib/calculateRentalYield';
import { calculateStampDuty } from '../lib/calculateStampDuty';
import { CurrencyInput } from './ui/CurrencyInput';
function Money({ value }) {
    return <strong>{new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)}</strong>;
}
function MonthlyEquivalent({ value }) {
    return <span className="monthly-equivalent">({new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value / 12)}/month)</span>;
}
function CopyResultButton({ value }) {
    const [copied, setCopied] = useState(false);
    async function copyResult() {
        await navigator.clipboard.writeText(String(value));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    }
    return <button type="button" onClick={copyResult}>{copied ? 'Copied!' : 'Copy Result'}</button>;
}
function ResultFigure({ label, value, monthly = true }) {
    return (<>
      <p className="result-line">{label}: <Money value={value}/> {monthly && <MonthlyEquivalent value={value}/>}</p>
      <CopyResultButton value={value}/>
    </>);
}
function ResultPanel({ children, invalid, hasInput }) {
    return (<aside className={`result-panel ${invalid ? 'error' : ''}`}>
      {invalid ? <p>Please check your inputs.</p> : hasInput ? children : (<div>
        <h2>Enter your details</h2>
        <p>Enter your details above to see your estimate.</p>
      </div>)}
    </aside>);
}
function invalidNumbers(...values) {
    return values.some((value) => !Number.isFinite(value) || value < 0);
}
export function CalculatorForm({ slug, config }) {
    switch (slug) {
        case 'stamp-duty':
            return <StampDutyForm config={config}/>;
        case 'borrowing-capacity':
            return <BorrowingCapacityForm config={config}/>;
        case 'lvr':
            return <LvrForm config={config}/>;
        case 'cgt':
            return <CgtForm />;
        case 'rental-yield':
            return <RentalYieldForm />;
        case 'depreciation':
            return <DepreciationForm />;
    }
}
function StampDutyForm({ config }) {
    const states = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];
    const [state, setState] = useState('NSW');
    const [price, setPrice] = useState('');
    const [firstHomeBuyer, setFirstHomeBuyer] = useState(false);
    useEffect(() => {
        const stored = window.localStorage.getItem('auspropertycalc:stamp-duty-state');
        if (stored !== null) setState(stored || 'NSW');
    }, []);
    function updateState(nextState) {
        setState(nextState);
        window.localStorage.setItem('auspropertycalc:stamp-duty-state', nextState);
    }
    const numericPrice = price === '' ? 0 : price;
    const result = useMemo(() => calculateStampDuty(numericPrice, config, state), [numericPrice, config, state]);
    const effectiveRate = numericPrice > 0 ? ((result.duty / numericPrice) * 100).toFixed(2) : '0.00';
    const invalid = price !== '' && invalidNumbers(numericPrice);
    const thresholdRows = (result.thresholds ?? []).slice(0, 5);
    return (<>
      <div className="form-grid">
        <label>State / Territory
          <select value={state} onChange={(event) => updateState(event.target.value)}>
            {states.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <small>Your state selection is saved locally.</small>
        </label>
        <CurrencyInput label="Purchase price" value={price} onChange={setPrice} error={invalid ? 'Enter a property value above $0.' : ''} placeholder="$800,000"/>
        <label className="check flex items-center gap-3">
          First home buyer
          <input
            type="checkbox"
            checked={firstHomeBuyer}
            onChange={(event) => setFirstHomeBuyer(event.target.checked)}
            style={{ width: 'auto', flex: '0 0 auto', accentColor: '#b45309' }}
          />
        </label>
        {invalid && <p className="error-text">Enter a property value above $0.</p>}
      </div>
      <ResultPanel invalid={invalid} hasInput={numericPrice > 0}>
        <ResultFigure label={`Estimated ${result.state} duty`} value={result.duty}/>
        <p>Effective rate: <strong>{effectiveRate}%</strong></p>
        <CopyResultButton value={effectiveRate}/>
        {firstHomeBuyer && <p>First home buyer concessions may reduce this amount depending on your state, property value, and eligibility.</p>}
        <div className="threshold-table">
          {thresholdRows.map((threshold) => <span key={`${threshold.min}-${threshold.max}`}>
            {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(threshold.min)} - {threshold.max ? new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(threshold.max) : 'above'} · {threshold.rate}%
          </span>)}
        </div>
      </ResultPanel>
    </>);
}
function BorrowingCapacityForm({ config }) {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [debts, setDebts] = useState('');
    const [dependants, setDependants] = useState(0);
    const [joint, setJoint] = useState(false);
    const numericIncome = income === '' ? 0 : income;
    const numericExpenses = (expenses === '' ? 0 : expenses) + (debts === '' ? 0 : debts) + Number(dependants) * 4800;
    const result = calculateBorrowingCapacity(numericIncome, numericExpenses, config);
    const invalid = (income !== '' || expenses !== '' || debts !== '') && invalidNumbers(numericIncome, numericExpenses);
    return (<>
      <div className="form-grid">
        <label className="check flex items-center gap-3">Joint application <input type="checkbox" checked={joint} onChange={(event) => setJoint(event.target.checked)}/></label>
        <CurrencyInput label={joint ? 'Annual household income' : 'Annual income'} value={income} onChange={setIncome} placeholder="$180,000"/>
        <CurrencyInput label="Annual expenses" value={expenses} onChange={setExpenses} placeholder="$52,000"/>
        <CurrencyInput label="Existing annual debt repayments" value={debts} onChange={setDebts} placeholder="$12,000"/>
        <label>Dependants<input type="number" min="0" value={dependants} onChange={(event) => setDependants(Number(event.target.value))}/></label>
        {invalid && <p className="error-text">Income and expenses must be zero or higher.</p>}
      </div>
      <ResultPanel invalid={invalid} hasInput={numericIncome > 0}>
        <ResultFigure label="Estimated capacity" value={result.capacity}/>
        <p>Estimated monthly repayment at {result.assessmentRate}%: <Money value={result.monthlyRepayment}/></p>
        <CopyResultButton value={result.monthlyRepayment}/>
        {result.exceedsSixTimesIncome && <p className="error-text">Warning: this estimate exceeds 6x income.</p>}
        {result.lowIncomeWarning && <p>Your income may be below lender thresholds. Results are indicative only.</p>}
      </ResultPanel>
    </>);
}
function LvrForm({ config }) {
    const [price, setPrice] = useState('');
    const [deposit, setDeposit] = useState('');
    const numericPrice = price === '' ? 0 : price;
    const numericDeposit = deposit === '' ? 0 : deposit;
    const result = calculateLvr(numericPrice, numericDeposit, config);
    const hasInput = price !== '' || deposit !== '';
    const invalid = hasInput && (price === '' || deposit === '' || invalidNumbers(numericPrice, numericDeposit) || numericPrice === 0);
    return (<>
      <div className="form-grid">
        <CurrencyInput label="Property price" value={price} onChange={setPrice} placeholder="$750,000"/>
        <CurrencyInput label="Deposit" value={deposit} onChange={setDeposit} placeholder="$150,000"/>
        {invalid && <p className="error-text">Property price must be greater than zero and deposit cannot be negative.</p>}
      </div>
      <ResultPanel invalid={invalid} hasInput={hasInput}>
        <p>LVR: <strong>{result.lvr}%</strong></p>
        <CopyResultButton value={result.lvr}/>
        <ResultFigure label="Loan amount" value={result.loanAmount}/>
        <p>LMI applies: <strong>{result.lmiApplies ? 'Yes' : 'No'}</strong> {result.lmiApplies && `(${result.lmiCostBand})`}</p>
        <p>Risk indicator: <strong>{result.risk}</strong></p>
        <ResultFigure label={`Deposit gap to ${config.targetLvr}% LVR`} value={result.depositGap}/>
      </ResultPanel>
    </>);
}
function CgtForm() {
    const [salePrice, setSalePrice] = useState('');
    const [costBase, setCostBase] = useState('');
    const [costs, setCosts] = useState('');
    const [discount, setDiscount] = useState(false);
    const [ownership, setOwnership] = useState('individual');
    const result = calculateCgt(salePrice === '' ? 0 : salePrice, costBase === '' ? 0 : costBase, costs === '' ? 0 : costs, 0.39, discount);
    const hasInput = salePrice !== '' || costBase !== '' || costs !== '';
    const invalid = hasInput && invalidNumbers(salePrice === '' ? 0 : salePrice, costBase === '' ? 0 : costBase, costs === '' ? 0 : costs);
    return (<>
      <div className="form-grid">
        <CurrencyInput label="Sale price" value={salePrice} onChange={setSalePrice} placeholder="$900,000"/>
        <CurrencyInput label="Purchase price / cost base" value={costBase} onChange={setCostBase} placeholder="$650,000"/>
        <CurrencyInput label="Improvements and selling costs" value={costs} onChange={setCosts} placeholder="$42,000"/>
        <label>Ownership type<select value={ownership} onChange={(event) => setOwnership(event.target.value)}><option>individual</option><option>joint</option><option>company</option></select></label>
        <label className="check flex items-center gap-3">Held more than 12 months <input type="checkbox" checked={discount} onChange={(event) => setDiscount(event.target.checked)}/></label>
      </div>
      <ResultPanel invalid={invalid || (hasInput && (salePrice === '' || costBase === ''))} hasInput={hasInput}>
        <ResultFigure label="Gross gain" value={result.capitalGain}/>
        <ResultFigure label="Taxable gain" value={result.taxableGain}/>
        <ResultFigure label="Estimated CGT" value={result.taxPayable}/>
        {result.note && <p>{result.note}</p>}
      </ResultPanel>
    </>);
}
function RentalYieldForm() {
    const [price, setPrice] = useState('');
    const [rent, setRent] = useState('');
    const [expenses, setExpenses] = useState('');
    const result = calculateRentalYield(price === '' ? 0 : price, rent === '' ? 0 : rent, expenses === '' ? 0 : expenses);
    const hasInput = price !== '' || rent !== '' || expenses !== '';
    return (<>
      <div className="form-grid">
        <CurrencyInput label="Property value" value={price} onChange={setPrice} placeholder="$650,000"/>
        <CurrencyInput label="Weekly rent" value={rent} onChange={setRent} placeholder="$620"/>
        <CurrencyInput label="Annual expenses" value={expenses} onChange={setExpenses} placeholder="$6,500"/>
      </div>
      <ResultPanel invalid={hasInput && (price === '' || rent === '')} hasInput={hasInput}>
        <p>Gross yield: <strong>{result.grossYield}%</strong></p>
        <CopyResultButton value={result.grossYield}/>
        <p>Net yield: <strong>{result.netYield}%</strong></p>
        <CopyResultButton value={result.netYield}/>
        <ResultFigure label="Estimated annual net rent" value={Math.max(0, Number(rent || 0) * 52 - Number(expenses || 0))}/>
        <p>{result.netYield >= 4 ? 'This sits above many metro benchmark yields.' : 'This is a lower-yield estimate; check growth assumptions and holding costs.'}</p>
      </ResultPanel>
    </>);
}
function DepreciationForm() {
    const [cost, setCost] = useState('');
    const [propertyType, setPropertyType] = useState('unit');
    const [constructionYear, setConstructionYear] = useState(2018);
    const [life, setLife] = useState(40);
    const result = calculateDepreciation(cost === '' ? 0 : cost, life, 5, constructionYear);
    return (<>
      <div className="form-grid">
        <label>Property type<select value={propertyType} onChange={(event) => setPropertyType(event.target.value)}><option>unit</option><option>house</option></select></label>
        <label>Construction year<input type="number" value={constructionYear} onChange={(event) => setConstructionYear(Number(event.target.value))}/></label>
        <CurrencyInput label="Purchase price / construction cost" value={cost} onChange={setCost} placeholder="$420,000"/>
        <label>Effective life<input type="number" value={life} onChange={(event) => setLife(Number(event.target.value))}/></label>
      </div>
      <ResultPanel invalid={false} hasInput={cost !== ''}>
        <ResultFigure label={`${propertyType === 'house' ? 'House' : 'Unit'} annual deduction`} value={result.annualDeduction}/>
        <ResultFigure label="First 5 years" value={result.totalDeduction}/>
        <ResultFigure label="Total 10-year claimable" value={result.tenYearTotal}/>
        {result.note && <p>{result.note}</p>}
      </ResultPanel>
    </>);
}
