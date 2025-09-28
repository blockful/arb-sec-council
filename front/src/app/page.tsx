import VotesFeed from '../components/VotesFeed';
import VoterStats from '../components/VoterStats';
import ContendersFeed from '../components/ContendersFeed';
import CountdownTimer from '../components/CountdownTimer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/design-system';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      {/* Header */}
      <header className="bg-surface-default shadow-sm border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 sm:hidden">
            {/* Title */}
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Arbitrum Security Council Election
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Live voting dashboard and statistics
              </p>
            </div>
            
            {/* Second row: Countdown timer and network info */}
            <div className="flex items-center justify-between gap-4">
              <div className="bg-surface-elevated border border-border-default rounded-lg px-4 py-2 shadow-sm">
                <CountdownTimer 
                  targetTimestamp={1759154338} 
                  label="Nomination phase ends"
                />
              </div>
              
              <div className="text-right">
                <div className="text-xs text-text-dimmed">
                  Network: Arbitrum One
                </div>
                <div className="text-xs text-text-dimmed">
                  Updates every 10 seconds
                </div>
                <div className="text-xs text-text-dimmed mt-1">
                  powered by blockful
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                Arbitrum Security Council Election
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Live voting dashboard and statistics
              </p>
            </div>
            
            {/* Countdown timer in middle on desktop */}
            <div className="flex justify-center">
              <div className="bg-surface-elevated border border-border-default rounded-lg px-4 py-2 shadow-sm">
                <CountdownTimer 
                  targetTimestamp={1759154338} 
                  label="Nomination phase ends"
                />
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-text-dimmed">
                Network: Arbitrum One
              </div>
              <div className="text-xs text-text-dimmed">
                Updates every 10 seconds
              </div>
              <div className="text-xs text-text-dimmed mt-1">
                powered by blockful
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Layout with Integrated Tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="votes" variant="underline">
          {/* Tabs Navigation - Integrated with header */}
          <div className="bg-surface-default border-b border-border-default">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TabsList variant="underline" className="w-full justify-between bg-transparent p-0 h-auto grid grid-cols-3">
                <TabsTrigger value="votes" variant="underline" className="flex-1 px-4 py-4 text-center">
                  Live Votes
                </TabsTrigger>
                <TabsTrigger value="contenders" variant="underline" className="flex-1 px-4 py-4 text-center">
                  Contenders
                </TabsTrigger>
                <TabsTrigger value="voters" variant="underline" className="flex-1 px-4 py-4 text-center">
                  Voters
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <TabsContent value="votes" variant="underline" className="mt-0">
              <VotesFeed />
            </TabsContent>
            
            <TabsContent value="contenders" variant="underline" className="mt-0">
              <ContendersFeed />
            </TabsContent>
            
            <TabsContent value="voters" variant="underline" className="mt-0">
              <VoterStats />
            </TabsContent>
          </main>
        </Tabs>
      </div>

      {/* Desktop Layout */}
      <main className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Votes Feed */}
          <div className="order-1">
            <VotesFeed />
          </div>

          {/* Contenders Feed */}
          <div className="order-2">
            <ContendersFeed />
          </div>

          {/* Voter Stats */}
          <div className="order-3">
            <VoterStats />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-default border-t border-border-default mt-8 sm:mt-12">
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
