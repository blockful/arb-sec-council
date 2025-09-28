import { VoterFilterState } from '../types/filters';

interface Voter {
  address: string;
  ensName?: string | null;
  updatedAt: string;
  votingPower: string;
  availableVotes: string;
}

export function sortVoters(voters: Voter[], filterState: VoterFilterState): Voter[] {
  const { sortBy, direction } = filterState;
  
  const sorted = [...voters].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'latest-activity':
        // updatedAt is a timestamp string, convert to number for comparison
        const aTime = parseInt(a.updatedAt);
        const bTime = parseInt(b.updatedAt);
        comparison = bTime - aTime; // Most recent first by default
        break;
        
      case 'voting-power':
        // votingPower is a string representation of BigInt
        const aPower = BigInt(a.votingPower);
        const bPower = BigInt(b.votingPower);
        comparison = aPower > bPower ? -1 : aPower < bPower ? 1 : 0;
        break;
        
      case 'remaining-vp':
        // availableVotes is a string representation of BigInt
        const aRemaining = BigInt(a.availableVotes);
        const bRemaining = BigInt(b.availableVotes);
        comparison = aRemaining > bRemaining ? -1 : aRemaining < bRemaining ? 1 : 0;
        break;
        
      default:
        return 0;
    }
    
    // Apply sort direction
    return direction === 'asc' ? -comparison : comparison;
  });
  
  return sorted;
}
