import fs from 'node:fs/promises';
import path from 'node:path';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { EmailCapture } from '../../components/EmailCapture';

type Props = {
  source: MDXRemoteSerializeResult;
  title: string;
};

export default function BlogPost({ source, title }: Props) {
  return (
    <main className="page prose">
      <article>
        <h1>{title}</h1>
        <MDXRemote {...source} />
      </article>
      <EmailCapture />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const files = await fs.readdir(blogDir);
  return {
    paths: files.map((file) => ({ params: { slug: file.replace(/\.mdx$/, '') } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  const raw = await fs.readFile(path.join(process.cwd(), 'content/blog', `${slug}.mdx`), 'utf8');
  const title = raw.match(/^#\s+(.+)$/m)?.[1] ?? 'Property guide';
  const source = await serialize(raw.replace(/^#\s+(.+)$/m, ''));
  return { props: { source, title } };
};
