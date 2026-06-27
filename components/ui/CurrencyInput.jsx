import { useEffect, useState } from 'react';

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

function displayValue(value) {
  if (value === '' || value === null || value === undefined || Number.isNaN(Number(value))) return '';
  return formatter.format(Number(value));
}

export function CurrencyInput({ value, onChange, label, error, placeholder }) {
  const [text, setText] = useState(displayValue(value));

  useEffect(() => {
    setText(displayValue(value));
  }, [value]);

  function handleChange(event) {
    const cleaned = event.target.value.replace(/\D/g, '');
    const numeric = cleaned === '' ? '' : Number(cleaned);
    setText(displayValue(numeric));
    onChange(numeric);
  }

  return (
    <label>{label}
      <input
        inputMode="numeric"
        value={text}
        placeholder={placeholder}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
      />
      {error && <span className="error-text">{error}</span>}
    </label>
  );
}
