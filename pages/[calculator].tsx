import type { GetStaticPaths, GetStaticProps } from 'next';
import { CalculatorForm } from '../components/CalculatorForms';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { calculatorSlugs, calculators } from '../lib/calculators';
import type { CalculatorSlug } from '../lib/types';

type Props = {
  slug: CalculatorSlug;
};

export default function CalculatorPage({ slug }: Props) {
  const calculator = calculators[slug];
  return (
    <CalculatorLayout title={calculator.title} description={calculator.description}>
      <CalculatorForm slug={slug} config={calculator.config} />
    </CalculatorLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: calculatorSlugs.map((calculator) => ({ params: { calculator } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: {
    slug: params?.calculator as CalculatorSlug,
  },
});
