import { create } from 'apisauce';
import mapKeysDeep from 'deep-map-keys';
import { camelCase, snakeCase } from 'lodash';

process.env.ITUNES_URL = "https://itunes.apple.com/"

const { ITUNES_URL } = process.env;

const apiClients = {
  itunes: null,
  default: null
};
export const getApiClient = (type = 'itunes') => apiClients[type];
export const generateApiClient = (type = 'itunes') => {

  switch (type) {
    case 'itunes':
      apiClients[type] = createApiClientWithTransForm(ITUNES_URL);

      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(ITUNES_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
   
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
