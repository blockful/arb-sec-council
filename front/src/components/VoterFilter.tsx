'use client';

import { VoterFilterProps, VoterSortOption } from '../types/filters';

// Simple SVG icons for sort direction
const ChevronUpIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const sortOptions: { value: VoterSortOption; label: string; description: string }[] = [
  {
    value: 'latest-activity',
    label: 'Latest Activity',
    description: 'Sort by most recent voting activity'
  },
  {
    value: 'voting-power',
    label: 'Voting Power',
    description: 'Sort by voting power amount'
  },
  {
    value: 'remaining-vp',
    label: 'Available VP',
    description: 'Sort by remaining voting power'
  }
];

export default function VoterFilter({ filterState, onFilterChange }: VoterFilterProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as VoterSortOption;
    onFilterChange({ sortBy, direction: filterState.direction });
  };

  const toggleDirection = () => {
    const direction = filterState.direction === 'desc' ? 'asc' : 'desc';
    onFilterChange({ sortBy: filterState.sortBy, direction });
  };

  const currentOption = sortOptions.find(option => option.value === filterState.sortBy);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-text-dimmed">
        Sort by:
      </span>
      <div className="flex items-center gap-1">
        <select
          value={filterState.sortBy}
          onChange={handleSortChange}
          className="text-xs bg-surface-default border border-border-default rounded px-2 py-1 text-text-primary focus:outline-none focus:ring-1 focus:ring-border-focus"
          title={currentOption?.description}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={toggleDirection}
          className="inline-flex items-center justify-center w-6 h-6 rounded border border-border-default bg-surface-default hover:bg-surface-hover transition-colors text-text-primary"
          title={`Sort ${filterState.direction === 'desc' ? 'descending' : 'ascending'}`}
        >
          {filterState.direction === 'desc' ? (
            <ChevronDownIcon className="w-3 h-3" />
          ) : (
            <ChevronUpIcon className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
}
