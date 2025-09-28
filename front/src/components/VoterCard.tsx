'use client';

import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_VOTER_STATS } from '../lib/queries';
import { formatTimeAgo, formatVotes, formatPercentage } from '../lib/utils';
import AddressDisplay from './AddressDisplay';
import { Card, CardContent } from '@/shared/components/ui';
import { ActivityIndicator, BlankState, SimpleProgressBar, TheButton } from '@/shared/components/design-system';

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

interface VoterStatsData {
  votes: {
    items: Vote[];
  };
}

interface VoterCardProps {
  voter: {
    address: string;
    ensName?: string | null;
    votingPower: string;
    availableVotes: string;
  };
}

export default function VoterCard({ voter }: VoterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [getVoterStats, { loading, error, data }] = useLazyQuery<VoterStatsData>(GET_VOTER_STATS);

  const votingPower = BigInt(voter.votingPower);
  const availableVotes = BigInt(voter.availableVotes);
  const usedVotes = votingPower - availableVotes;
  const usagePercentage = formatPercentage(usedVotes, votingPower);

  const voterVotes = data?.votes?.items || [];

  const handleExpand = () => {
    if (!isExpanded && voterVotes.length === 0) {
      getVoterStats({ variables: { voter: voter.address } });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="bg-surface-default border border-border-default">
      {/* Card Header - Always Visible */}
      <CardContent className="pb-3">
        <div className="mb-2">
          <AddressDisplay
            address={voter.address}
            ensName={voter.ensName}
            className="text-sm font-medium text-text-primary"
            showCopyButton={true}
            copyButtonSize="sm"
          />
        </div>

        {/* Voting Power Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-center p-2 bg-surface-contrast rounded">
            <p className="text-xs text-text-dimmed mb-1">Total VP</p>
            <p className="text-sm font-semibold text-text-primary">
              {formatVotes(votingPower)}
            </p>
          </div>
          <div className="text-center p-2 bg-surface-contrast rounded">
            <p className="text-xs text-text-dimmed mb-1">VP Used</p>
            <p className="text-sm font-semibold text-text-error">
              {formatVotes(usedVotes)}
            </p>
          </div>
          <div className="text-center p-2 bg-surface-contrast rounded">
            <p className="text-xs text-text-dimmed mb-1">VP Remaining</p>
            <p className="text-sm font-semibold text-text-success">
              {formatVotes(availableVotes)}
            </p>
          </div>
        </div>

        {/* Usage Progress Bar */}
        <div className="mb-2">
          <SimpleProgressBar
            value={usagePercentage}
            max={100}
            label="Voting Power Usage"
            showValue={true}
            variant="brand"
            size="md"
          />
        </div>
        
        {/* Expand/Collapse Button - Moved to bottom */}
        <div className="flex justify-center">
          <button
            onClick={handleExpand}
            className="text-text-secondary hover:text-text-primary transition-colors px-3 py-1 rounded-md hover:bg-surface-hover"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            <div className="flex items-center space-x-1">
              <span className="text-xs">
                {isExpanded ? 'Hide voting history' : 'Show voting history'}
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
      </CardContent>

      {/* Expandable Content - Voting History */}
      {isExpanded && (
        <div className="border-t border-border-default">
          <CardContent className="pt-3">
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Voting History
            </h4>
            
            {loading && (
              <ActivityIndicator label="Loading voting history..." size="sm" />
            )}

            {error && (
              <div className="text-text-error text-sm py-2">
                Error loading votes: {error.message}
              </div>
            )}

            {data && voterVotes.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {voterVotes.map((vote) => (
                  <div
                    key={vote.id}
                    className="border border-border-default rounded p-2 hover:bg-surface-hover transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <AddressDisplay
                        address={vote.contender.address}
                        ensName={vote.contender.name || vote.contender.ensName}
                        className="text-xs text-text-success"
                        showCopyButton={false}
                      />
                      <span className="text-xs text-text-dimmed">
                        {formatTimeAgo(BigInt(vote.timestamp))}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-text-primary">
                      {formatVotes(BigInt(vote.votes))} votes
                    </p>
                  </div>
                ))}
              </div>
            )}

            {data && voterVotes.length === 0 && (
              <BlankState
                title="No votes cast yet"
                description="This voter hasn't cast any votes."
              />
            )}
          </CardContent>
        </div>
      )}
    </Card>
  );
}
