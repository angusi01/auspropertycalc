import fs from 'node:fs/promises';
import path from 'node:path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { CalculatorForm } from '../../components/CalculatorForms';
import { EmailCapture } from '../../components/EmailCapture';
import { calculators } from '../../lib/calculators';

const calculatorByPost = {
    'stamp-duty-cost-before-offer': ['stamp-duty'],
    'deposit-actually-need': ['lvr', 'stamp-duty'],
    'investment-property-on-salary': ['borrowing-capacity', 'rental-yield'],
    'selling-investment-property-tax': ['cgt'],
    'first-home-buyer-concessions': ['stamp-duty'],
    'new-vs-old-depreciation': ['depreciation', 'cgt'],
    'rent-needed-to-cover-mortgage': ['rental-yield', 'borrowing-capacity'],
    'saved-deposit-what-can-buy': ['lvr', 'stamp-duty', 'borrowing-capacity'],
};

export default function BlogPost({ source, title, slug, isDraft }) {
    const embedded = calculatorByPost[slug] ?? [];
    return (<main className="page prose">
      <article>
        {isDraft && <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">DRAFT — Incomplete</span>}
        <h1>{title}</h1>
        <MDXRemote {...source}/>
      </article>
      {embedded.map((calculatorSlug) => (
        <section className="calculator-shell inline-calculator" key={calculatorSlug}>
          <div>
            <h2>{calculators[calculatorSlug].title}</h2>
            <p>{calculators[calculatorSlug].description}</p>
          </div>
          <CalculatorForm slug={calculatorSlug} config={calculators[calculatorSlug].config}/>
        </section>
      ))}
      <EmailCapture />
    </main>);
}
export const getStaticPaths = async () => {
    const blogDir = path.join(process.cwd(), 'content/blog');
    const files = await fs.readdir(blogDir);
    return {
        paths: files.map((file) => ({ params: { slug: file.replace(/\.mdx$/, '') } })),
        fallback: false,
    };
};
export const getStaticProps = async ({ params }) => {
    const slug = String(params?.slug);
    const raw = await fs.readFile(path.join(process.cwd(), 'content/blog', `${slug}.mdx`), 'utf8');
    const title = raw.match(/^#\s+(.+)$/m)?.[1] ?? 'Property guide';
    const body = raw
      .replace(/^---[\s\S]*?---\s*/m, '')
      .replace(/^#\s+(.+)$/m, '')
      .trim();
    const bodyText = body.replace(/[#*_`>\-[\]()]/g, '').replace(/\s+/g, ' ').trim();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    const source = await serialize(body);
    return { props: { source, title, slug, isDraft: bodyText.length < 200 || wordCount < 100 } };
};
