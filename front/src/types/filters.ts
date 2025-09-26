export type VoterSortOption = 'latest-activity' | 'voting-power';
export type SortDirection = 'asc' | 'desc';

export interface VoterFilterState {
  sortBy: VoterSortOption;
  direction: SortDirection;
}

export interface VoterFilterProps {
  filterState: VoterFilterState;
  onFilterChange: (filterState: VoterFilterState) => void;
}
