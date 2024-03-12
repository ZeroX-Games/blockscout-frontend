import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ResourceErrorV1, ResourceNameV1, ResourcePayloadV1 } from './resourcesv1';
import type { Params as ApiFetchParams } from './useApiFetchV1';
import useApiFetch from './useApiFetchV1';

export interface Params<R extends ResourceNameV1, E = unknown> extends ApiFetchParams<R> {
  queryOptions?: Omit<UseQueryOptions<ResourcePayloadV1<R>, ResourceErrorV1<E>, ResourcePayloadV1<R>>, 'queryKey' | 'queryFn'>;
}

export function getResourceKeyV1<R extends ResourceNameV1>(resource: R, { pathParams, queryParams }: Params<R> = {}) {
  if (pathParams || queryParams) {
    return [ resource, { ...pathParams, ...queryParams } ];
  }

  return [ resource ];
}

export default function useApiQueryV1<R extends ResourceNameV1, E = unknown>(
  resource: R,
  { queryOptions, pathParams, queryParams, fetchParams }: Params<R, E> = {},
) {
  const apiFetch = useApiFetch();

  return useQuery<ResourcePayloadV1<R>, ResourceErrorV1<E>, ResourcePayloadV1<R>>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: getResourceKeyV1(resource, { pathParams, queryParams }),
    queryFn: async() => {
      // all errors and error typing is handled by react-query
      // so error response will never go to the data
      // that's why we are safe here to do type conversion "as Promise<ResourcePayload<R>>"
      return apiFetch(resource, { pathParams, queryParams, fetchParams }) as Promise<ResourcePayloadV1<R>>;
    },
    ...queryOptions,
  });
}
