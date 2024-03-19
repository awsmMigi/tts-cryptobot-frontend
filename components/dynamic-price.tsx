function dynamicTokenPrice(requestedTokens: string[]) {
  const randomPercentETH = Math.random() * 0.2 - 0.1;
  const randomPercentBTC = Math.random() * 0.2 - 0.1;
  const randomPercentWLD = Math.random() * 0.2 - 0.1;
  const randomPercentXRP = Math.random() * 0.2 - 0.1;

  const allTokens: object = {
    ETH: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
      price: 3636.63 * (1 + randomPercentETH),
      timestamp: Date.now(),
      confidence: 0.99,
    },
    BTC: {
      decimals: 18,
      name: "Bitcoin",
      symbol: "BTC",
      price: 68400.0 * (1 + randomPercentBTC),
      timestamp: Date.now(),
      confidence: 0.99,
    },
    WLD: {
      decimals: 2,
      name: "Worldcoin",
      symbol: "WLD",
      price: 9.19 * (1 + randomPercentWLD),
      timestamp: Date.now(),
      confidence: 0.99,
    },
    XRP: {
      decimals: 8,
      name: "Ripple",
      symbol: "XRP",
      price: 0.62 * (1 + randomPercentXRP),
      timestamp: Date.now(),
      confidence: 0.99,
    },
  };
  const tokens: { [key: string]: object } = {};
  for (const token of requestedTokens) {
    if (allTokens[token as keyof typeof allTokens]) {
      tokens[token] = allTokens[token as keyof typeof allTokens];
    }
  }

  return tokens;
}

export async function dynamicPrice(coins: string) {
  const requestedTokens = coins.toUpperCase().split(",") || [];
  console.log("Requested tokens: ", requestedTokens);
  const data = dynamicTokenPrice(requestedTokens);

  return data;
}
