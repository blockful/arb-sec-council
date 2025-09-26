import { gql } from '@apollo/client';

export const GET_VOTES = gql`
  query GetVotes($limit: Int = 50) {
    votes(
      orderBy: "timestamp"
      orderDirection: "desc"
      limit: $limit
    ) {
      items {
        id
        contender {
          address
          ensName
        }
        voter {
          address
          ensName
          votingPower
          availableVotes
        }
        votes
        timestamp
        availableVotes
      }
    }
  }
`;

export const GET_VOTER_STATS = gql`
  query GetVoterStats($voter: String!) {
    votes(
      where: { voter: $voter }
      orderBy: "timestamp"
      orderDirection: "desc"
    ) {
      items {
        id
        contender {
          address
          ensName
        }
        voter {
          address
          ensName
          votingPower
          availableVotes
        }
        votes
        timestamp
        availableVotes
      }
    }
  }
`;

export const GET_ELECTION_STATS = gql`
  query GetElectionStats {
    votes {
      items {
        voter
      }
    }
    voters {
      items {
        address
        ensName
        votingPower
        availableVotes
      }
    }
    contenders {
      items {
        address
        ensName
      }
    }
  }
`;

export const GET_UNIQUE_VOTERS = gql`
  query GetUniqueVoters {
    voters(
      orderBy: "updatedAt"
      orderDirection: "desc"
    ) {
      items {
        address
        ensName
        updatedAt
        votingPower
        availableVotes
      }
    }
  }
`;