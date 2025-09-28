'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTENDERS, GET_CONTENDER_VOTES } from '../lib/queries';
import { formatVotes, formatTimeAgo } from '../lib/utils';
import AddressDisplay from './AddressDisplay';
import { Card, CardHeader, CardContent } from '@/shared/components/ui';
import { ActivityIndicator, BlankState, TextIconLeft } from '@/shared/components/design-system';

interface Contender {
  address: string;
  ensName?: string | null;
  name?: string | null;
  picture?: string | null;
  bio?: string | null;
  totalVotes: string;
  nominated: boolean;
  title?: string | null;
}

interface ContendersData {
  contenders: {
    items: Contender[];
  };
}

interface ContenderVote {
  id: string;
  voter: {
    address: string;
    ensName?: string | null;
    votingPower: string;
    availableVotes: string;
  };
  votes: string;
  timestamp: string;
}

interface ContenderVotesData {
  votes: {
    items: ContenderVote[];
  };
}

type SortOption = 'vp' | 'timestamp';

function ContenderCard({ contender, index }: { contender: Contender; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('vp');
  const { loading: votesLoading, error: votesError, data: votesData } = useQuery<ContenderVotesData>(
    GET_CONTENDER_VOTES,
    {
      variables: { contender: contender.address },
      skip: !isExpanded,
      pollInterval: isExpanded ? 10000 : 0, // Only poll when expanded
    }
  );

  const contenderVotes = votesData?.votes?.items || [];
  
  // Sort voters based on selected option
  const sortedVoters = [...contenderVotes].sort((a, b) => {
    if (sortBy === 'vp') {
      // Sort by voting power (highest first)
      const aPower = BigInt(a.voter.votingPower);
      const bPower = BigInt(b.voter.votingPower);
      return aPower > bPower ? -1 : aPower < bPower ? 1 : 0;
    } else {
      // Sort by timestamp (most recent first)
      return BigInt(b.timestamp) > BigInt(a.timestamp) ? 1 : -1;
    }
  });

  return (
    <div className="border border-border-default rounded-lg p-3 sm:p-4 hover:bg-surface-hover transition-colors">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-solid-primary flex items-center justify-center text-text-primary font-semibold text-xs sm:text-sm">
          #{index + 1}
        </div>
        
        {/* Profile Picture */}
        {contender.picture && (
          <div className="flex-shrink-0">
            <img
              src={contender.picture}
              alt={contender.name || 'Contender'}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <AddressDisplay
              address={contender.address}
              ensName={contender.name || contender.ensName}
              className="text-text-primary font-medium"
              showCopyButton={true}
              copyButtonSize="sm"
            />
            {contender.nominated && (
              <span className="px-2 py-1 bg-surface-solid-success text-text-primary text-xs rounded-full">
                Nominated
              </span>
            )}
          </div>
          
          {contender.title && (
            <p className="text-sm text-text-secondary mb-1">
              {contender.title}
            </p>
          )}
          
          {contender.bio && (
            <p className="text-sm text-text-secondary mb-1 line-clamp-2">
              {contender.bio}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
            <div className="text-base sm:text-lg font-semibold text-text-primary">
              {formatVotes(BigInt(contender.totalVotes))} votes
            </div>
            <div className="text-xs text-text-dimmed">
              Total received
            </div>
          </div>
          
          {/* Expand/Collapse Button - Moved to bottom */}
          <div className="flex justify-center mt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-secondary hover:text-text-primary transition-colors px-3 py-1 rounded-md hover:bg-surface-hover"
              aria-label={isExpanded ? 'Hide voters' : 'Show voters'}
            >
              <div className="flex items-center space-x-1">
                <span className="text-xs">
                  {isExpanded ? 'Hide voters' : 'Show voters'}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Voters Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border-default">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-text-primary">
              Voters ({contenderVotes.length})
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-dimmed">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs bg-surface-default border border-border-default rounded px-2 py-1 text-text-primary focus:outline-none focus:ring-1 focus:ring-border-focus"
              >
                <option value="vp">Voting Power</option>
                <option value="timestamp">Vote Time</option>
              </select>
            </div>
          </div>

          {votesLoading && (
            <div className="flex items-center justify-center py-4">
              <ActivityIndicator label="Loading voters..." size="sm" />
            </div>
          )}

          {votesError && (
            <div className="text-text-error text-sm py-2">
              Error loading voters: {votesError.message}
            </div>
          )}

          {!votesLoading && !votesError && sortedVoters.length === 0 && (
            <BlankState
              title="No voters yet"
              description="No votes have been cast for this contender."
            />
          )}

          {!votesLoading && !votesError && sortedVoters.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sortedVoters.map((vote) => (
                <div
                  key={vote.id}
                  className="border border-border-default rounded p-3 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <AddressDisplay
                      address={vote.voter.address}
                      ensName={vote.voter.ensName}
                      className="text-sm text-text-primary"
                      showCopyButton={false}
                    />
                    {sortBy === 'vp' && (
                      <span className="text-xs text-text-dimmed">
                        {formatTimeAgo(BigInt(vote.timestamp))}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold text-text-primary">
                      {formatVotes(BigInt(vote.votes))} votes cast
                    </div>
                    <div className="text-xs text-text-secondary">
                      {sortBy === 'vp' ? (
                        <div className="text-right">
                          <div>VP: {formatVotes(BigInt(vote.voter.votingPower))}</div>
                          <div className="text-text-success">Remaining: {formatVotes(BigInt(vote.voter.availableVotes))}</div>
                        </div>
                      ) : (
                        <>{formatTimeAgo(BigInt(vote.timestamp))}</>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContendersFeed() {
  const { loading, error, data } = useQuery<ContendersData>(GET_CONTENDERS, {
    pollInterval: 10000, // Poll every 10 seconds
  });

  if (loading) {
    return (
      <Card className="bg-surface-default">
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Contenders Leaderboard
          </h2>
        </CardHeader>
        <CardContent>
          <ActivityIndicator label="Loading contenders..." size="md" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-surface-default">
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Contenders Leaderboard
          </h2>
        </CardHeader>
        <CardContent>
          <div className="text-text-error text-sm">
            Error loading contenders: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const contenders = data?.contenders?.items || [];

  const LiveIndicator = () => (
    <TextIconLeft
      icon={<div className="h-2 w-2 bg-surface-solid-success rounded-full animate-pulse" />}
      text="Live"
      variant="dimmed"
      size="xs"
    />
  );

  return (
    <Card className="bg-surface-default">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
            Contenders Leaderboard
          </h2>
          <LiveIndicator />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {contenders.length === 0 ? (
            <BlankState
              title="No contenders yet"
              description="Contenders will appear here as votes are cast."
            />
          ) : (
            contenders.map((contender, index) => (
              <ContenderCard
                key={contender.address}
                contender={contender}
                index={index}
              />
            ))
          )}
        </div>

        {contenders.length > 0 && (
          <div className="mt-4 text-xs text-text-dimmed text-center">
            Showing {contenders.length} contenders • Updates every 10 seconds
          </div>
        )}
      </CardContent>
    </Card>
  );
}
