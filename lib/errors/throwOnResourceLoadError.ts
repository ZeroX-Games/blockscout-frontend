import type { ResourceError, ResourceName } from 'lib/api/resources';
import type { ResourceErrorV1, ResourceNameV1 } from 'lib/api/v1/resourcesv1';

type Params = ({
  isError: true;
  error: ResourceError<unknown> | ResourceErrorV1<unknown>;
} | {
  isError: false;
  error: null;
}) & {
  resource?: ResourceName | ResourceNameV1;
}

export const RESOURCE_LOAD_ERROR_MESSAGE = 'Resource load error';

export default function throwOnResourceLoadError({ isError, error, resource }: Params) {
  if (isError) {
    throw Error(RESOURCE_LOAD_ERROR_MESSAGE, { cause: { ...error, resource } as unknown as Error });
  }
}
