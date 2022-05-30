import brownieConfig from "./brownie-config.json";

export const getContractAddress = (
  contractName: string,
  networkName: string = "bsc-test"
): string => {
  return brownieConfig["networks"][networkName]["contracts"][contractName];
};
