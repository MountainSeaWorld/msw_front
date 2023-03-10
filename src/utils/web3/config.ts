const dev_config = {
  type: "dev",
  chainId: 97,
  chainIdName: "bsc-testnet",
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
  chainName: "BSC",
  scanRpc: "https://testnet.bscscan.com/address/",
  TokenName: "BNB",
  tokenDecimals: 18,
  nativeTokenAddress: "0x0000000000000000000000000000000000000000",

  TokenAddress: "0x2b12737B999FD28d17E8D2Ccc4248Ff1C611C832",
  PropsAddress: "0xcA103419cfBAf852fc6F3D8c6A1349c92Ce2B05D",
  CardsAddress: "0x15DAd25fEd9c5EfF86459FC3cAaa31ac66aED4d8",
  StoreAddress: "0x28032791154775e1250b3dB5B48DCF20B84f3693",
  BoxAddress: "0x8323e9c63865ab45c3582124368F87F0500b9421",
  MarketAddress: "0x3047298209422ED37d02b4C72006C3F76B448Bf6",
  MineAddress: "0xb12e333ABEaCF19dc752e3C354a4C9A2B66dDB43",

  BOXTokenId: 1,
  CardTokenId: 2,

  ajaxUrl: "https://api-testnet.bscscan.com/api",
  apiKey: "JJJ37IHZKYU6AX25IQ27CN6UZY1HZYFW5H",

  maxNftNumber: 2000,
};


const prd_config = {
  type: "prd",
  chainId: 56, //id
  chainIdName: "bsc",
  rpc: "https://bsc-dataseed1.ninicoin.io",
  chainName: "BSC",
  scanRpc: "https://bscscan.com/address/",
  TokenName: "BNB",
  tokenDecimals: 18,
  nativeTokenAddress: "0x0000000000000000000000000000000000000000",

  TokenAddress: "0xcA8800938B32cEcd3c2C96bb491fc302dd4a1B42",
  PropsAddress: "0x86607F9C2466efa233103Bdc37A5D8A363DA932f",
  CardsAddress: "0x8A30497C918bc1792dfF369562bC292651057DF5",
  StoreAddress: "0x0617AcE8fB39bdF163CC4288EF0E33dBEf67Cbe5",
  BoxAddress: "0x37436fa4367D4364c6fD221ee58E472Df41d8157",
  MarketAddress: "0x046bc1B398b42C2AE988180f544201F1d33a63D9",
  MineAddress: "0xDb40a7DC215cc8Ff6797Cfe9C9f1Fd4aC548cB58",
  BOXTokenId: 1,
  CardTokenId: 2,

  ajaxUrl: "https://api.bscscan.com/api",
  apiKey: "KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7",

  maxNftNumber: 2000,
};

const { REACT_APP_ENV } = process.env;
const config = REACT_APP_ENV === "prd" ? prd_config : dev_config;
window.configType = config.type;
export default config;
