export function generateUUIDV4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function createQueryString(query: any = {}): string {
  const keys = Object.keys(query);

  if (keys.length === 0) {
    return '';
  }

  return keys
    .reduce((accumulator: string[], key: any) => {
      accumulator.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
      return accumulator;
    }, [])
    .join('&');
}
