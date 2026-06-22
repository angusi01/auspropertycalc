import Head from 'next/head';
import Link from 'next/link';

export default function Methodology() {
  return (
    <>
      <Head>
        <title>How Our Calculations Work | AusPropertyCalc</title>
      </Head>
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">How Our Calculations Work</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Stamp Duty</h2>
              <p className="text-gray-600">
                This calculator estimates stamp duty (transfer duty) based on the property purchase price and selected Australian state or territory.
                It applies the tiered progressive rate schedules and includes first-home buyer concessions and exemptions where applicable.
                Rates reflect 2025–2026 state revenue office published schedules.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Borrowing Capacity</h2>
              <p className="text-gray-600">
                This calculator estimates your maximum borrowable amount based on gross annual income, monthly expenses, existing debts, and loan term.
                It applies a standard stress-test buffer of 3% above the entered interest rate as required by APRA guidelines.
                Results are indicative only — actual lender assessments will vary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">LVR / LMI</h2>
              <p className="text-gray-600">
                The Loan-to-Value Ratio (LVR) calculator determines the percentage of the property value you are borrowing.
                Where the LVR exceeds 80%, Lenders Mortgage Insurance (LMI) estimates are calculated using published insurer premium tables (Genworth/QBE indicative rates).
                LMI can be capitalised into the loan or paid upfront.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Capital Gains Tax (CGT)</h2>
              <p className="text-gray-600">
                This calculator estimates the capital gain on an investment property sale based on purchase price, sale price, purchase costs, and holding period.
                The 50% CGT discount applies to assets held for 12 months or more by individuals and trusts, in line with ATO published rules.
                Rates are based on 2025–2026 ATO published marginal tax rate schedules.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Rental Yield</h2>
              <p className="text-gray-600">
                This calculator computes gross and net rental yield from weekly rent, property value, and annual property expenses.
                Gross yield is calculated as annual rent divided by property value. Net yield subtracts entered annual costs (rates, insurance, management fees) before dividing.
                Results follow standard Australian property investment yield conventions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Depreciation</h2>
              <p className="text-gray-600">
                This calculator estimates annual tax depreciation deductions for investment properties using the diminishing value method.
                It applies ATO-published effective life schedules for Division 40 plant and equipment items and Division 43 capital works deductions.
                Rates reflect 2025–2026 ATO published rulings.
              </p>
            </section>

            <section className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">Disclaimer</h2>
              <p className="text-amber-700">
                These calculators provide estimates only. Results are based on inputs you provide and published rate schedules, and may not reflect your specific circumstances.
                Always consult a licensed financial adviser, mortgage broker, or conveyancer before making property decisions.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/" className="text-amber-600 hover:underline">← Back to Calculators</Link>
          </div>
        </div>
      </div>
    </>
  );
}
