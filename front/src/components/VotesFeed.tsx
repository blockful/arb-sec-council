'use client';

import { useQuery } from '@apollo/client';
import { GET_VOTES } from '../lib/queries';
import { formatTimeAgo, formatVotes } from '../lib/utils';
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

interface VotesData {
  votes: {
    items: Vote[];
  };
}

export default function VotesFeed() {
  const { loading, error, data } = useQuery<VotesData>(GET_VOTES, {
    pollInterval: 10000, // Poll every 10 seconds
  });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Live Votes Feed
        </h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Live Votes Feed
        </h2>
        <div className="text-red-500 text-sm">
          Error loading votes: {error.message}
        </div>
      </div>
    );
  }

  const votes = data?.votes?.items || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Live Votes Feed
        </h2>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {votes.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">
            No votes yet
          </div>
        ) : (
          votes.map((vote) => (
            <div
              key={vote.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 text-sm text-gray-900 dark:text-white">
                    <AddressDisplay
                      address={vote.voter.address}
                      ensName={vote.voter.ensName}
                      className="text-blue-600 dark:text-blue-400"
                      showCopyButton={true}
                      copyButtonSize="sm"
                    />
                    <span>{' → '}</span>
                    <AddressDisplay
                      address={vote.contender.address}
                      ensName={vote.contender.ensName}
                      className="text-green-600 dark:text-green-400"
                      showCopyButton={true}
                      copyButtonSize="sm"
                    />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatVotes(BigInt(vote.votes))} votes
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                  {formatTimeAgo(BigInt(vote.timestamp))}
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-x-4">
                <span>
                  Vote Amount: {formatVotes(BigInt(vote.votes))}
                </span>
                <span>
                  Voting Power: {formatVotes(BigInt(vote.voter.votingPower))}
                </span>
                <span>
                  Available: {formatVotes(BigInt(vote.availableVotes))}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {votes.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Showing latest {votes.length} votes • Updates every 10 seconds
        </div>
      )}
    </div>
  );
}