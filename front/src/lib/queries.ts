import { gql } from '@apollo/client';

export const GET_VOTES = gql`
  query GetVotes {
    votes(
      orderBy: "timestamp"
      orderDirection: "desc"
    ) {
      items {
        id
        contender {
          address
          ensName
          name
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
          name
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
        name
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

export const GET_CONTENDERS = gql`
  query GetContenders {
    contenders(
      orderBy: "totalVotes"
      orderDirection: "desc"
    ) {
      items {
        address
        ensName
        name
        picture
        bio
        totalVotes
        nominated
        title
      }
    }
  }
`;

export const GET_CONTENDER_VOTES = gql`
  query GetContenderVotes($contender: String!) {
    votes(
      where: { contender: $contender }
      orderBy: "votes"
      orderDirection: "desc"
    ) {
      items {
        id
        voter {
          address
          ensName
          votingPower
          availableVotes
        }
        votes
        timestamp
      }
    }
  }
`;