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
                It applies tiered progressive rate schedules. NSW rates reflect the Revenue NSW 2025/26 transfer duty thresholds in force from 1 July 2025 to 30 June 2026, checked on 27 June 2026.
                Where official tables use &quot;$100 or part&quot; increments, the calculator rounds the taxable bracket excess up to the next $100.
                VIC and QLD estimates use published home-concession rates for selected owner-occupied homes and general rates for investment property. ACT estimates use the owner-occupier table for selected homes and the non-owner occupier table for investment property. NT estimates use the statutory under-$525,000 formula.
                The first home buyer checkbox applies deterministic first-home duty rules where the form has enough information: NSW home and vacant-land exemptions and tapers, VIC full exemption and taper up to $750,000, QLD established-home/new-home/vacant-land rules, SA new-home and vacant-land relief, current enacted WA first home owner rates with region selection, and the TAS established-home exemption only for an entered settlement date through 30 June 2026.
                It also shows current official grant and concession guidance links for each state or territory.
                Other concessions depend on home type, contract date, occupancy, income, region, and eligibility details that must be confirmed with the relevant revenue office.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Borrowing Capacity</h2>
              <p className="text-gray-600">
                This calculator estimates a simplified maximum borrowable amount from entered after-tax annual income, annual living and property expenses, existing annual debt repayments, a 30-year term, and the entered expected loan rate.
                It adds APRA&apos;s current 3 percentage point mortgage serviceability buffer to that rate. Actual lender expense benchmarks, policy, floor rates, and approved exceptions vary.
                Results are indicative only and are not a lender assessment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">LVR / LMI</h2>
              <p className="text-gray-600">
                The Loan-to-Value Ratio (LVR) calculator determines the percentage of the property value you are borrowing.
                Where the LVR exceeds 80%, the calculator flags that Lenders Mortgage Insurance may apply.
                It does not invent or quote an insurer premium because prices and waivers vary by lender, insurer, loan size, profession, and borrower. Confirm LMI with your lender or mortgage insurer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Capital Gains Tax (CGT)</h2>
              <p className="text-gray-600">
                This calculator estimates a capital gain from sale price, purchase price or cost base, and improvements or selling costs.
                It applies the 50% CGT discount when selected for assets held for at least 12 months by eligible individuals or joint owners. Companies cannot use that discount.
                The displayed estimate uses the tax rate entered by the user. Joint owners need to calculate their respective ownership shares using their own tax rates and capital losses.
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
                This calculator estimates Division 43 straight-line annual deductions using eligible construction expenditure, the construction start date, and the entered period of income-producing use.
                For residential capital works, ATO guidance generally uses 2.5% per year over 40 years for eligible construction beginning after 15 September 1987.
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
