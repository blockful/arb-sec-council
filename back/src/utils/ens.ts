import { ethers } from 'ethers';

// Cache for ENS resolutions to avoid repeated calls
const ensCache = new Map<string, string | null>();
const reverseEnsCache = new Map<string, string | null>();

// Create provider for mainnet ENS resolution
let provider: ethers.Provider | null = null;

function getProvider() {
  if (!provider) {
    try {
      // Use environment variable for Ethereum mainnet RPC
      const rpcUrl = process.env.PONDER_RPC_URL_1;
      if (!rpcUrl) {
        console.error('PONDER_RPC_URL_1 environment variable is not set for ENS resolution');
        return null;
      }
      provider = new ethers.JsonRpcProvider(rpcUrl);
    } catch (error) {
      console.error('Failed to create ENS provider:', error);
      return null;
    }
  }
  return provider;
}

export async function resolveENS(ensName: string): Promise<string | null> {
  if (ensCache.has(ensName)) {
    return ensCache.get(ensName) || null;
  }

  try {
    const provider = getProvider();
    if (!provider) return null;

    const address = await provider.resolveName(ensName);
    ensCache.set(ensName, address);
    return address;
  } catch (error) {
    console.error(`Failed to resolve ENS name ${ensName}:`, error);
    ensCache.set(ensName, null);
    return null;
  }
}

export async function reverseResolveENS(address: string): Promise<string | null> {
  if (reverseEnsCache.has(address)) {
    return reverseEnsCache.get(address) || null;
  }

  try {
    const provider = getProvider();
    if (!provider) return null;

    const ensName = await provider.lookupAddress(address);
    reverseEnsCache.set(address, ensName);
    return ensName;
  } catch (error) {
    console.error(`Failed to reverse resolve address ${address}:`, error);
    reverseEnsCache.set(address, null);
    return null;
  }
}

export function clearENSCache() {
  ensCache.clear();
  reverseEnsCache.clear();
}

// Helper function to check if ENS data is stale (older than 24 hours)
export function isEnsDataStale(ensUpdatedAt: bigint | null): boolean {
  if (!ensUpdatedAt) return true;
  
  const now = BigInt(Math.floor(Date.now() / 1000));
  const twentyFourHours = BigInt(24 * 60 * 60); // 24 hours in seconds
  
  return (now - ensUpdatedAt) > twentyFourHours;
}
