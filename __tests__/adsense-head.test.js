import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9341291547647066';

describe('AdSense verification script', () => {
  it('loads the configured publisher script from the global document head', async () => {
    const documentSource = await readFile(
      new URL('../pages/_document.jsx', import.meta.url),
      'utf8',
    );
    const headContents = documentSource.match(/<Head>([\s\S]*?)<\/Head>/)?.[1];

    expect(headContents).toBeDefined();
    expect(headContents).toContain('<script');
    expect(headContents).toContain(`src="${ADSENSE_SRC}"`);
    expect(headContents).toMatch(/<script\s+async\s+/);
    expect(headContents).toContain('crossOrigin="anonymous"');
  });
});
