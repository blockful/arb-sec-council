export const config = {
  ponder: {
    graphqlUrl: process.env.NEXT_PUBLIC_PONDER_GRAPHQL_URL || 'http://localhost:42069/graphql',
  },
} as const;
