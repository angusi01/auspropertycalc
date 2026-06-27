import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';

export default function BlogIndex({ posts }) {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Property Guides & Resources</h1>
          <p>Free guides on stamp duty, borrowing capacity, LVR, CGT, rental yield, and depreciation for Australian property buyers and investors.</p>
        </div>
      </section>
      {posts.length ? (
        <section className="link-grid">
          {posts.map((post) => (
            <Link className="calc-card" href={`/blog/${post.slug}`} key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.meta}</p>
              <span>Read guide</span>
            </Link>
          ))}
        </section>
      ) : (
        <section className="explanation-section">
          <h2>Guides coming soon</h2>
          <p>We&apos;re writing clear, practical guides on Australian property. Check back soon.</p>
        </section>
      )}
    </main>
  );
}

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const files = await fs.readdir(blogDir);
  const posts = await Promise.all(files.filter((file) => file.endsWith('.mdx')).map(async (file) => {
    const raw = await fs.readFile(path.join(blogDir, file), 'utf8');
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: raw.match(/^#\s+(.+)$/m)?.[1] ?? 'Property guide',
      meta: raw.split('\n').find((line) => line.trim() && !line.startsWith('#')) ?? 'Australian property guide.',
    };
  }));
  return { props: { posts } };
}
