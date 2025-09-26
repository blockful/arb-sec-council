import { createConfig } from "ponder";

import { SecurityCouncilNomineeGovernorAbi } from "./abis/SecurityCouncilNomineeGovernorAbi";

export default createConfig({
  chains: {
    arbitrum: {
      id: 42161,
      rpc: process.env.PONDER_RPC_URL_42161!,
    },
  },
  contracts: {
    SecurityCouncilNomineeGovernor: {
      chain: "arbitrum",
      abi: SecurityCouncilNomineeGovernorAbi,
      address: "0x8a1cDA8dee421cD06023470608605934c16A05a0",
      startBlock: 381833780,
    },
  },
});
