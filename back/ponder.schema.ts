import { onchainTable, relations } from "ponder";

// votes table
export const vote = onchainTable("vote", (t) => ({
  id: t.text().primaryKey(),
  voter: t.text(),
  contender: t.text(),
  votes: t.bigint(),
  timestamp: t.bigint(),
  availableVotes: t.bigint(),
}));

// voters table
export const voter  = onchainTable("voter", (t) => ({
  address: t.text().primaryKey(),
  ensName: t.text(),
  ensUpdatedAt: t.bigint(),
  updatedAt: t.bigint(),
  votingPower: t.bigint(),
  availableVotes: t.bigint(),
}));

// contenders
export const contender = onchainTable("contender", (t) => ({
  address: t.text().primaryKey(),
  ensName: t.text(),
  ensUpdatedAt: t.bigint(),
  timestamp: t.bigint(),
  name: t.text(),
  picture: t.text(),
  bio: t.text(),
  totalVotes: t.bigint(),
  nominated: t.boolean(),
  rejected: t.boolean(),
  title: t.text(),
  tallyUpdatedAt: t.bigint(),
}));

//relation between vote and voter
export const voteRelations = relations(vote, ({ one }) => ({
  voter: one(voter, {
    fields: [vote.voter],
    references: [voter.address],
  }),
  contender: one(contender, {
    fields: [vote.contender],
    references: [contender.address],
  })
}));

//relation between voter and vote
export const voterRelations = relations(voter, ({ many }) => ({
  votes: many(vote),
}));

//relation between contender and vote
export const contenderRelations = relations(contender, ({ many }) => ({
  votes: many(vote),
}));
