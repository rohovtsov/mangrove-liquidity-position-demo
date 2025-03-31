export function bigintToString(n: bigint, decimals: number): string {
  const factor = BigInt(10 ** decimals);
  const integerPart = n / factor;
  const fractionalPart = n % factor;
  const fractionalString = fractionalPart.toString().padStart(decimals, '0').replace(/0+$/, '');
  return fractionalString ? `${integerPart}.${fractionalString}` : `${integerPart}`;
}

export function stringToBigint(s: string, decimals: number): bigint {
  const [integerPart, fractionalPart = ''] = s.split('.');
  const fractionalPadded = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integerPart) * BigInt(10 ** decimals) + BigInt(fractionalPadded);
}
