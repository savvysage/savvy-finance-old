import brownieConfig from "./brownie-config.json";

export const numberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  // maximumFractionDigits: 2,
});

export const getContractAddress = (
  contractName: string,
  networkName: string = "bsc-test"
): string => {
  return brownieConfig["networks"][networkName]["contracts"][contractName];
};
