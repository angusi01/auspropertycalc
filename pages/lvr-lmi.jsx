import CalculatorPage from './[calculator]';
import { calculators } from '../lib/calculators';

export default function LvrLmiPage() {
  return <CalculatorPage slug="lvr" />;
}

export const getStaticProps = async () => ({
  props: {
    slug: 'lvr',
    calculator: calculators.lvr,
  },
});
