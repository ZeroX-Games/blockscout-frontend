export interface AddressTag {
  label: string;
  display_name: string;
  address_hash: string;
}

export interface WatchlistName {
  label: string;
  display_name: string;
}

export type DomainParamBasic = {
  domainId: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  img_url?: string;
  hash?: string;
}

export type DomainParam = DomainParamBasic;
