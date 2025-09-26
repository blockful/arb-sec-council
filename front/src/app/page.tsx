import VotesFeed from '../components/VotesFeed';
import VoterStats from '../components/VoterStats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Arbitrum Security Council Election
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Live voting dashboard and statistics
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Network: Arbitrum One
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Updates every 10 seconds
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Votes Feed */}
          <div className="order-1 lg:order-1">
            <VotesFeed />
          </div>

          {/* Voter Stats */}
          <div className="order-2 lg:order-2">
            <VoterStats />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
              Arbitrum Security Council Election Dashboard • Custom GraphQL Indexer
            </p>
            <p className="mt-1">
              Contract: 0x8a1cDA8dee421cD06023470608605934c16A05a0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
