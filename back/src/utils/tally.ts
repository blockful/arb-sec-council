interface TallyContender {
  id: string;
  account: {
    address: string;
    name: string;
    bio: string;
    picture: string;
  };
  totalVotes: number;
  nominated: boolean;
  rejected: boolean;
  accountElectionMeta: {
    title: string;
  };
}

interface TallyResponse {
  data: {
    nominationRound: {
      contenders: TallyContender[];
    };
  };
}

const TALLY_API_URL = "https://api.tally.xyz/query";

const TALLY_QUERY = `
  query ElectionNominationRoundContenders($electionNumber: Int!, $councilSlug: String!, $pagination: Pagination, $sort: CandidateSort, $filter: ContenderFilter) {
    nominationRound(electionNumber: $electionNumber, councilSlug: $councilSlug) {
      contenders(pagination: $pagination, sort: $sort, filter: $filter) {
        id
        account {
          address
          name
          bio
          picture
        }
        totalVotes
        nominated
        rejected
        accountElectionMeta {
          title
        }
      }
    }
  }
`;

export async function fetchTallyContenders(electionNumber: number = 4): Promise<TallyContender[]> {
  try {
    const response = await fetch(TALLY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': '365b418f59bd6dc4a0d7f23c2e8c12d982f156e9069695a6f0a2dcc3232448df'
      },
      body: JSON.stringify({
        query: TALLY_QUERY,
        variables: {
          pagination: { offset: 0, limit: 25 }, // Increased limit to get all contenders
          electionNumber,
          councilSlug: "security-council",
          filter: "ALL",
          sort: "RANDOM"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TallyResponse = await response.json();
    console.log(data.data.nominationRound.contenders);
    
    if (!data.data?.nominationRound?.contenders) {
      throw new Error('Invalid response structure from Tally API');
    }

    return data.data.nominationRound.contenders;
  } catch (error) {
    console.error('Error fetching Tally contenders:', error);
    throw error;
  }
}

export function mapTallyContenderToDb(contender: TallyContender, timestamp: bigint) {
  return {
    address: contender.account.address.toLowerCase(), // Normalize address to lowercase
    name: contender.account.name || null,
    picture: contender.account.picture || null,
    bio: contender.account.bio || null,
    totalVotes: BigInt(contender.totalVotes || 0),
    nominated: contender.nominated || false,
    rejected: contender.rejected || false,
    title: contender.accountElectionMeta?.title || null,
    tallyUpdatedAt: timestamp,
  };
}
