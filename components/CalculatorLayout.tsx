import type { ReactNode } from 'react';
import { EmailCapture } from './EmailCapture';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export function CalculatorLayout({ title, description, children }: Props) {
  return (
    <main className="page calculator-page">
      <section className="hero">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="tool-panel">{children}</section>
      <EmailCapture />
    </main>
  );
}
