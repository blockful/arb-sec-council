'use client';

import { useQuery } from '@apollo/client';
import { GET_VOTES } from '../lib/queries';
import { formatTimeAgo, formatVotes } from '../lib/utils';
import AddressDisplay from './AddressDisplay';
import { Card, CardHeader, CardContent } from '@/shared/components/ui';
import { ActivityIndicator, BlankState, TextIconLeft } from '@/shared/components/design-system';

interface Vote {
  id: string;
  contender: {
    address: string;
    ensName?: string | null;
    name?: string | null;
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
      <Card className="bg-surface-default">
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Live Votes Feed
          </h2>
        </CardHeader>
        <CardContent>
          <ActivityIndicator label="Loading votes..." size="md" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-surface-default">
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Live Votes Feed
          </h2>
        </CardHeader>
        <CardContent>
          <div className="text-text-error text-sm">
            Error loading votes: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const votes = data?.votes?.items || [];

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Live Votes Feed
          </h2>
          <LiveIndicator />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {votes.length === 0 ? (
            <BlankState
              title="No votes yet"
              description="Votes will appear here as they are cast."
            />
          ) : (
            votes.map((vote) => (
              <div
                key={vote.id}
                className="border border-border-default rounded-lg p-4 hover:bg-surface-hover transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 text-sm text-text-primary">
                      <AddressDisplay
                        address={vote.voter.address}
                        ensName={vote.voter.ensName}
                        className="text-text-link"
                        showCopyButton={true}
                        copyButtonSize="sm"
                      />
                      <span>{' → '}</span>
                      <AddressDisplay
                        address={vote.contender.address}
                        ensName={vote.contender.name || vote.contender.ensName}
                        className="text-text-success"
                        showCopyButton={true}
                        copyButtonSize="sm"
                      />
                    </div>
                    <p className="text-lg font-semibold text-text-primary">
                      {formatVotes(BigInt(vote.votes))} votes
                    </p>
                  </div>
                  <div className="text-xs text-text-dimmed whitespace-nowrap ml-4">
                    {formatTimeAgo(BigInt(vote.timestamp))}
                  </div>
                </div>

                <div className="text-xs text-text-secondary space-x-4">
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
          <div className="mt-4 text-xs text-text-dimmed text-center">
            Showing latest {votes.length} votes • Updates every 10 seconds
          </div>
        )}
      </CardContent>
    </Card>
  );
}