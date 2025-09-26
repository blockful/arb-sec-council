import { formatDistanceToNow } from 'date-fns';

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimeAgo(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatVotes(votes: bigint, decimals: number = 18): string {
  const divisor = BigInt(10) ** BigInt(decimals);
  const wholePart = votes / divisor;
  return wholePart.toLocaleString();
}

export function calculateRemainingVotes(usableVotes: bigint, totalUsedVotes: bigint): bigint {
  return usableVotes - totalUsedVotes;
}

export function formatPercentage(used: bigint, total: bigint): number {
  if (total === BigInt(0)) return 0;
  return Math.round((Number(used) / Number(total)) * 100);
}