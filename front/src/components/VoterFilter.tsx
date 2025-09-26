'use client';

import { VoterFilterProps, VoterSortOption } from '../types/filters';

// Simple SVG icons
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
  }
];

export default function VoterFilter({ filterState, onFilterChange }: VoterFilterProps) {
  const handleSortChange = (sortBy: VoterSortOption) => {
    // If clicking the same sort option, toggle direction
    const direction = filterState.sortBy === sortBy && filterState.direction === 'desc' ? 'asc' : 'desc';
    onFilterChange({ sortBy, direction });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 self-center mr-2">
          Sort by:
        </span>
        {sortOptions.map((option) => {
          const isActive = filterState.sortBy === option.value;
          const isDesc = filterState.direction === 'desc';
          
          return (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`
                inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
              title={option.description}
            >
              {option.label}
              {isActive && (
                isDesc ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronUpIcon className="w-4 h-4" />
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
