'use client';

import { useQuery } from '@apollo/client';
import { GET_CONTENDERS } from '../lib/queries';
import { formatVotes } from '../lib/utils';
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
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
              <div
                key={contender.address}
                className="border border-border-default rounded-lg p-4 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-solid-primary flex items-center justify-center text-text-primary font-semibold text-sm">
                    #{index + 1}
                  </div>
                  
                  {/* Profile Picture */}
                  {contender.picture && (
                    <div className="flex-shrink-0">
                      <img
                        src={contender.picture}
                        alt={contender.name || 'Contender'}
                        className="w-12 h-12 rounded-full object-cover"
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
                      <p className="text-sm text-text-secondary mb-2">
                        {contender.title}
                      </p>
                    )}
                    
                    {contender.bio && (
                      <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                        {contender.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-text-primary">
                        {formatVotes(BigInt(contender.totalVotes))} votes
                      </div>
                      <div className="text-xs text-text-dimmed">
                        Total received
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
