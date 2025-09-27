'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_UNIQUE_VOTERS } from '../lib/queries';
import VoterCard from './VoterCard';
import VoterFilter from './VoterFilter';
import { VoterFilterState } from '../types/filters';
import { sortVoters } from '../utils/voterFilters';
import { Card, CardHeader, CardContent } from '@/shared/components/ui';
import { BlankState } from '@/shared/components/design-system';

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
  const { data: votersData } = useQuery<VotersData>(GET_UNIQUE_VOTERS);
  const [filterState, setFilterState] = useState<VoterFilterState>({
    sortBy: 'latest-activity',
    direction: 'desc'
  });
  
  const voters = votersData?.voters?.items || [];
  const sortedVoters = sortVoters(voters, filterState);

  return (
    <Card className="bg-surface-default">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Voters
          </h2>
          {/* Compact Filter Controls */}
          <VoterFilter 
            filterState={filterState} 
            onFilterChange={setFilterState} 
          />
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Voter Cards */}
        {sortedVoters.length > 0 ? (
          <div className="space-y-3">
            {sortedVoters.map((voter) => (
              <VoterCard key={voter.address} voter={voter} />
            ))}
          </div>
        ) : (
          <BlankState
            title="No voters found"
            description="There are no voters to display at this time."
          />
        )}
      </CardContent>
    </Card>
  );
}