import { CalculatorForm } from '../components/CalculatorForms';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { calculatorSlugs, calculators } from '../lib/calculators';
export default function CalculatorPage({ slug }) {
    const calculator = calculators[slug];
    return (<CalculatorLayout title={calculator.title} description={calculator.description}>
      <CalculatorForm slug={slug} config={calculator.config}/>
    </CalculatorLayout>);
}
export const getStaticPaths = async () => ({
    paths: calculatorSlugs.map((calculator) => ({ params: { calculator } })),
    fallback: false,
});
export const getStaticProps = async ({ params }) => ({
    props: {
        slug: params?.calculator,
    },
});
