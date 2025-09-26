import { ethers } from 'ethers';

// Cache for ENS resolutions to avoid repeated calls
const ensCache = new Map<string, string | null>();
const reverseEnsCache = new Map<string, string | null>();

// Create provider for mainnet ENS resolution
let provider: ethers.Provider | null = null;

function getProvider() {
  if (!provider) {
    try {
      // Use public RPC endpoints for ENS resolution
      provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
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