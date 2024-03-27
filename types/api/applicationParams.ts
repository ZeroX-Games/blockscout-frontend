export interface AddressTag {
  label: string;
  display_name: string;
  address_hash: string;
}

export interface WatchlistName {
  label: string;
  display_name: string;
}

export type ApplicationDetail = {
  appLogoUrl: string;
}

export type ApplicationParamBasic = {
  applicationID: string;
  name: string;
  description: string | null;
  chainID: number;
  created_at: string;
  updated_at: string;
  img_url?: string;
  hash?: string;
  details: ApplicationDetail;
}

export type ApplicationParam = ApplicationParamBasic;
