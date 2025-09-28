import { ponder } from "ponder:registry";
import { vote, voter, contender } from "ponder:schema";
import { reverseResolveENS, isEnsDataStale } from "./utils/ens.js";
import { fetchTallyContenders, mapTallyContenderToDb } from "./utils/tally.js";

ponder.on("SecurityCouncilNomineeGovernor:VoteCastForContender", async ({ event, context }) => {
    const availableVotes = event.args.usableVotes - event.args.totalUsedVotes;

    await context.db
        .insert(vote)
        .values({
            id: `${event.transaction.hash}-${event.log.logIndex}`,
            voter: event.args.voter,
            contender: event.args.contender,
            votes: event.args.votes,
            timestamp: event.block.timestamp,
            availableVotes,
        });

    // Resolve ENS name for voter
    let voterEnsName: string | null = null;
    let voterEnsUpdatedAt: bigint | null = null;

    try {
        voterEnsName = await reverseResolveENS(event.args.voter);
        voterEnsUpdatedAt = event.block.timestamp;
    } catch (error) {
        console.error(`Failed to resolve ENS for voter ${event.args.voter}:`, error);
        voterEnsName = null;
        voterEnsUpdatedAt = null;
    }

    // upsert voter
    await context.db.insert(voter).values({
        address: event.args.voter,
        ensName: voterEnsName,
        ensUpdatedAt: voterEnsUpdatedAt,
        updatedAt: event.block.timestamp,
        votingPower: event.args.usableVotes,
        availableVotes
    }).onConflictDoUpdate({
        ensName: voterEnsName,
        ensUpdatedAt: voterEnsUpdatedAt,
        updatedAt: event.block.timestamp,
        votingPower: event.args.usableVotes,
        availableVotes
    });

    // Resolve ENS name for contender
    let contenderEnsName: string | null = null;
    let contenderEnsUpdatedAt: bigint | null = null;

    try {
        contenderEnsName = await reverseResolveENS(event.args.contender);
        contenderEnsUpdatedAt = event.block.timestamp;
    } catch (error) {
        console.error(`Failed to resolve ENS for contender ${event.args.contender}:`, error);
        contenderEnsName = null;
        contenderEnsUpdatedAt = null;
    }

    // upsert contender with ENS data
    await context.db.insert(contender).values({
        address: event.args.contender.toLowerCase(),
        ensName: contenderEnsName,
        ensUpdatedAt: contenderEnsUpdatedAt,
        timestamp: event.block.timestamp,
        name: null, // Will be populated by Tally data separately
        picture: null,
        bio: null,
        totalVotes: BigInt(0),
        nominated: false,
        title: null,
    }).onConflictDoUpdate((row) => ({
        ensName: contenderEnsName,
        ensUpdatedAt: contenderEnsUpdatedAt,
        timestamp: event.block.timestamp,
        totalVotes: row.totalVotes! + BigInt(event.args.votes),
        nominated: row.totalVotes! + BigInt(event.args.votes) > BigInt(9369469*10**18),
    }));
});

ponder.on("SecurityCouncilNomineeGovernor:setup", async ({ context }) => {
    const tallyContenders = await fetchTallyContenders();
    const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));

    for (const tallyContender of tallyContenders) {
        const dbContender = mapTallyContenderToDb(tallyContender, currentTimestamp);
        
        await context.db
            .insert(contender)
            .values({
                address: dbContender.address,
                ensName: null,
                ensUpdatedAt: null,
                timestamp: currentTimestamp,
                name: dbContender.name,
                picture: dbContender.picture,
                bio: dbContender.bio,
                totalVotes: BigInt(0),
                nominated: false,
                title: dbContender.title,
            })
    }
});