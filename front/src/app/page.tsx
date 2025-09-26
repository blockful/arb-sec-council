import VotesFeed from '../components/VotesFeed';
import VoterStats from '../components/VoterStats';
import ContendersFeed from '../components/ContendersFeed';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      {/* Header */}
      <header className="bg-surface-default shadow-sm border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Arbitrum Security Council Election
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Live voting dashboard and statistics
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-dimmed">
                Network: Arbitrum One
              </div>
              <div className="text-xs text-text-dimmed">
                Updates every 10 seconds
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Votes Feed */}
          <div className="order-1 lg:order-1">
            <VotesFeed />
          </div>

          {/* Contenders Feed */}
          <div className="order-2 lg:order-2">
            <ContendersFeed />
          </div>

          {/* Voter Stats */}
          <div className="order-3 lg:order-3">
            <VoterStats />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-default border-t border-border-default mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-xs text-text-dimmed">
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
