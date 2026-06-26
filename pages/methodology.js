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
                It applies tiered progressive rate schedules. NSW rates reflect Revenue NSW 2026/2027 transfer duty thresholds checked on 26 June 2026.
                Where official tables use "$100 or part" increments, the calculator rounds the taxable bracket excess up to the next $100.
                ACT estimates use the owner-occupier table for selected homes and the non-owner occupier table for investment property. NT estimates use the statutory under-$525,000 formula.
                The first home buyer checkbox applies deterministic first-home duty rules where the form has enough information: NSW full home and vacant-land exemptions, VIC full exemption and taper up to $750,000, QLD established-home/new-home/vacant-land rules, SA new-home and vacant-land relief, current WA first home owner rates with region selection, and TAS established-home exemption through the current scheme end date.
                It also shows current official grant and concession guidance links for each state or territory.
                Other concessions depend on home type, contract date, occupancy, income, region, and eligibility details that must be confirmed with the relevant revenue office.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Borrowing Capacity</h2>
              <p className="text-gray-600">
                This calculator estimates a simplified maximum borrowable amount from gross annual income, entered annual expenses, existing annual debt repayments, dependants, a 30-year term, and the configured assessment rate.
                APRA guidance refers to a minimum 3 percentage point serviceability buffer above the loan interest rate, but actual lender policy and floor rates vary.
                Results are indicative only and are not a lender assessment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">LVR / LMI</h2>
              <p className="text-gray-600">
                The Loan-to-Value Ratio (LVR) calculator determines the percentage of the property value you are borrowing.
                Where the LVR exceeds 80%, the calculator flags that Lenders Mortgage Insurance may apply and displays a broad indicative cost band.
                It does not quote live insurer premiums. Confirm LMI with your lender or mortgage insurer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Capital Gains Tax (CGT)</h2>
              <p className="text-gray-600">
                This calculator estimates a capital gain from sale price, purchase price or cost base, and improvements or selling costs.
                It applies the 50% CGT discount when selected for assets held for at least 12 months, consistent with ATO guidance for eligible individuals and trusts.
                The displayed tax estimate uses the configured default marginal tax rate and does not replace personal tax advice.
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
                This calculator estimates straight-line annual deductions using the entered cost and effective life.
                For residential capital works, ATO guidance generally uses 2.5% per year over 40 years for eligible construction after 15 September 1987.
                It does not prepare a full quantity surveyor depreciation schedule or Division 40 plant and equipment analysis.
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
