'use client';

import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_VOTER_STATS, GET_UNIQUE_VOTERS } from '../lib/queries';
import { formatTimeAgo, formatVotes, formatPercentage } from '../lib/utils';
import AddressDisplay from './AddressDisplay';

interface Vote {
  id: string;
  contender: {
    address: string;
    ensName?: string | null;
  };
  voter: {
    address: string;
    ensName?: string | null;
    votingPower: string;
    availableVotes: string;
  };
  votes: string;
  timestamp: string;
  availableVotes: string;
}

interface VoterStatsData {
  votes: {
    items: Vote[];
  };
}

interface VotersData {
  voters: {
    items: Array<{
      address: string;
      ensName?: string | null;
      updatedAt: string;
      votingPower: string;
      availableVotes: string;
    }>;
  };
}

export default function VoterStats() {
  const [selectedVoter, setSelectedVoter] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<string>('');

  const { data: votersData } = useQuery<VotersData>(GET_UNIQUE_VOTERS);
  const [getVoterStats, { loading, error, data }] = useLazyQuery<VoterStatsData>(GET_VOTER_STATS);

  const voters = votersData?.voters?.items || [];
  const voterVotes = data?.votes?.items || [];

  // Calculate voting power statistics
  const latestVote = voterVotes[0]; // Most recent vote has the current totals
  const votingPower = latestVote ? BigInt(latestVote.voter.votingPower) : BigInt(0);
  const availableVotes = latestVote ? BigInt(latestVote.voter.availableVotes) : BigInt(0);
  const usedVotes = votingPower - availableVotes;
  const usagePercentage = formatPercentage(usedVotes, votingPower);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSelectedVoter(searchInput.trim());
      getVoterStats({ variables: { voter: searchInput.trim() } });
    }
  };

  const handleVoterSelect = (address: string) => {
    setSelectedVoter(address);
    setSearchInput(address);
    getVoterStats({ variables: { voter: address } });
  };

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Voter Statistics
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter voter address..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     font-mono text-sm"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md
                     transition-colors disabled:opacity-50"
            disabled={!searchInput.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {/* Voter List */}
      {voters.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recent Voters ({voters.length})
          </h3>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {voters.map((voter) => (
              <div key={voter.address} className="flex items-center space-x-2">
                <button
                  onClick={() => handleVoterSelect(voter.address)}
                  className="flex-1 text-left px-2 py-1 text-xs
                           hover:bg-gray-100 dark:hover:bg-gray-700 rounded
                           text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <AddressDisplay
                    address={voter.address}
                    ensName={voter.ensName}
                    showCopyButton={false}
                  />
                </button>
                <button
                  onClick={() => copyToClipboard(voter.address)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600
                           dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  title="Copy full address"
                >
                  {copiedAddress === voter.address ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voter Statistics */}
      {selectedVoter && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Voter Details
            </h3>
            <AddressDisplay
              address={selectedVoter}
              ensName={latestVote?.voter.ensName}
              className="text-sm text-gray-900 dark:text-white"
              showCopyButton={true}
              copyButtonSize="md"
            />
          </div>

          {loading && (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">
              Error loading voter stats: {error.message}
            </div>
          )}

          {data && latestVote && (
            <>
              {/* Voting Power Overview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Power</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatVotes(votingPower)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Used</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {formatVotes(usedVotes)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {formatVotes(availableVotes)}
                  </p>
                </div>
              </div>

              {/* Usage Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Voting Power Used</span>
                  <span>{usagePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Voting History */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voting History ({voterVotes.length} votes)
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {voterVotes.map((vote) => (
                    <div
                      key={vote.id}
                      className="border border-gray-200 dark:border-gray-700 rounded p-3
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <AddressDisplay
                          address={vote.contender.address}
                          ensName={vote.contender.ensName}
                          className="text-sm text-green-600 dark:text-green-400"
                          showCopyButton={true}
                          copyButtonSize="sm"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(BigInt(vote.timestamp))}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatVotes(BigInt(vote.votes))} votes
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {data && voterVotes.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 text-center py-4">
              This voter hasn&apos;t cast any votes yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}