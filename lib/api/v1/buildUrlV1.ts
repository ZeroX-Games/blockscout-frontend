import { compile } from 'path-to-regexp';

import config from 'configs/app';

import isNeedProxy from '../isNeedProxy';
import { RESOURCES_V1 } from './resourcesv1';
import type { ApiResource, ResourceNameV1, ResourcePathParamsV1 } from './resourcesv1';

export default function buildUrlV1<R extends ResourceNameV1>(
  resourceName: R,
  pathParams?: ResourcePathParamsV1<R>,
  queryParams?: Record<string, string | Array<string> | number | boolean | null | undefined>,
): string {
  const resource: ApiResource = RESOURCES_V1[resourceName];
  const baseUrl = isNeedProxy() ? config.app.baseUrl : (resource.endpoint || config.api.endpoint);
  const basePath = resource.basePath !== undefined ? resource.basePath : config.api.basePath;
  const path = isNeedProxy() ? '/node-api/proxy' + basePath + resource.path : basePath + resource.path;
  const url = new URL(compile(path)(pathParams), baseUrl);

  queryParams && Object.entries(queryParams).forEach(([ key, value ]) => {
    // there are some pagination params that can be null or false for the next page
    if (value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v, i) => url.searchParams.append(`${ key }[${ i }]`, String(v)));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });

  return url.toString();
}
