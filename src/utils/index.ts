import { supportedChain } from "../configs";

export const inputRegex = /^\d*(?:\\[.])?\d*$/; // match escaped "." characters via in a non-capturing group
export const escapeRegExp = (string: string): string =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string

export const isSupportedChain = (chainId: number | undefined) =>
    supportedChain.id === chainId;
