import type { AddressParam } from 'types/api/addressParams';
import type { TokenInfo } from 'types/api/token';

export interface UpdateInterpretationResponse {
  data: {
    summaries: Array<UpdateInterpretationSummary>;
  };
}

export type UpdateInterpretationSummary = {
  amount: number;
  collection: UpdateInterpretationCollection;
  domain: UpdateInterpretationDomain;
}

export type UpdateInterpretationCollection = {
  name: string;
  imgUrl: string;
}

export type UpdateInterpretationDomain = {
  name: string;
  imgUrl: string;
}

export type UpdateInterpretationVariable =
  UpdateInterpretationVariableString |
  UpdateInterpretationVariableCurrency |
  UpdateInterpretationVariableTimestamp |
  UpdateInterpretationVariableToken |
  UpdateInterpretationVariableAddress |
  UpdateInterpretationVariableDomain;

export type UpdateInterpretationVariableType = 'string' | 'currency' | 'timestamp' | 'token' | 'address' | 'domain';

export type UpdateInterpretationVariableString = {
  type: 'string';
  value: string;
}

export type UpdateInterpretationVariableCurrency = {
  type: 'currency';
  value: string;
}

export type UpdateInterpretationVariableTimestamp = {
  type: 'timestamp';
  value: string;
}

export type UpdateInterpretationVariableToken = {
  type: 'token';
  value: TokenInfo;
}

export type UpdateInterpretationVariableAddress = {
  type: 'address';
  value: AddressParam;
}

export type UpdateInterpretationVariableDomain = {
  type: 'domain';
  value: string;
}
