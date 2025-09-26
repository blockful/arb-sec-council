import { useState, useEffect } from 'react';
import { reverseResolveENS } from '../lib/ens';

export function useENS(address: string) {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !address.startsWith('0x')) {
      setEnsName(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    reverseResolveENS(address)
      .then((name) => {
        if (!cancelled) {
          setEnsName(name);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('ENS resolution error:', error);
        if (!cancelled) {
          setEnsName(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [address]);

  return { ensName, loading };
}