export const isMac = process.platform === 'darwin';

export function macOrOther<T, U>({ mac, other }: { mac: T; other: U }) {
  return isMac ? mac : other;
}
