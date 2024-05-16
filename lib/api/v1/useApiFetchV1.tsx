import { useQueryClient } from '@tanstack/react-query';
import _omit from 'lodash/omit';
import _pickBy from 'lodash/pickBy';
import React from 'react';

import type { CsrfData } from 'types/client/account';

import config from 'configs/app';
import isBodyAllowed from 'lib/api/isBodyAllowed';
import isNeedProxy from 'lib/api/isNeedProxy';
import { getResourceKey } from 'lib/api/useApiQuery';
import * as cookies from 'lib/cookies';
import type { Params as FetchParams } from 'lib/hooks/useFetch';
import useFetch from 'lib/hooks/useFetch';

import buildUrlV1 from './buildUrlV1';
import { RESOURCES_V1 } from './resourcesv1';
import type { ApiResource, ResourceNameV1, ResourcePathParamsV1 } from './resourcesv1';

export interface Params<R extends ResourceNameV1> {
  pathParams?: ResourcePathParamsV1<R>;
  queryParams?: Record<string, string | Array<string> | number | boolean | undefined>;
  fetchParams?: Pick<FetchParams, 'body' | 'method' | 'signal' | 'headers'>;
}

export default function useApiFetchV1() {
  const fetch = useFetch();
  const queryClient = useQueryClient();
  const { token: csrfToken } = queryClient.getQueryData<CsrfData>(getResourceKey('csrf')) || {};

  return React.useCallback(<R extends ResourceNameV1, SuccessType = unknown, ErrorType = unknown>(
    resourceName: R,
    { pathParams, queryParams, fetchParams }: Params<R> = {},
  ) => {
    const apiToken = cookies.get(cookies.NAMES.API_TOKEN);

    const resource: ApiResource = RESOURCES_V1[resourceName];
    const url = buildUrlV1(resourceName, pathParams, queryParams);
    const withBody = isBodyAllowed(fetchParams?.method);
    const headers = _pickBy({
      'x-endpoint': resource.endpoint && isNeedProxy() ? resource.endpoint : undefined,
      Authorization: resource.endpoint && resource.needAuth ? apiToken : undefined,
      'x-csrf-token': withBody && csrfToken ? csrfToken : undefined,
      ...fetchParams?.headers,
    }, Boolean) as HeadersInit;

    return fetch<SuccessType, ErrorType>(
      url,
      {
        // as of today, we use cookies only
        //    for user authentication in My account
        //    for API rate-limits (cannot use in the condition though, but we agreed with devops team that should not be an issue)
        // change condition here if something is changed
        credentials: config.features.account.isEnabled ? 'include' : 'same-origin',
        headers,
        ..._omit(fetchParams, 'headers'),
      },
      {
        resource: resource.path,
        omitSentryErrorLog: true, // disable logging of API errors to Sentry
      },
    );
  }, [ fetch, csrfToken ]);
}
