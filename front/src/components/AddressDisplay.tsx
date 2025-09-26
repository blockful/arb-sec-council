'use client';

import { useState } from 'react';
import { formatAddress } from '../lib/utils';

interface AddressDisplayProps {
  address: string;
  ensName?: string | null;
  className?: string;
  showCopyButton?: boolean;
  copyButtonSize?: 'sm' | 'md';
}

export default function AddressDisplay({
  address,
  ensName,
  className = '',
  showCopyButton = false,
  copyButtonSize = 'sm'
}: AddressDisplayProps) {
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  // Use backend ENS name or formatted address
  const displayText = ensName || formatAddress(address);
  const iconSize = copyButtonSize === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span className={`inline-flex items-center space-x-1 ${className}`}>
      <span
        className="font-mono"
        title={ensName ? `${ensName} (${address})` : address}
      >
        {displayText}
      </span>
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-gray-600
                   dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          title="Copy full address"
        >
          {copiedAddress === address ? (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>
      )}
    </span>
  );
}