import axios, { AxiosResponse } from 'axios';

import { UNABLE_TO_RETRIEVE } from './types';

export async function fetchBlock(
  endpoint: string,
  height: number,
  headers: any
) {
  return await requestSidecarAPI(`${endpoint}/blocks/${height}`, headers);
}

export function isHeightOutOfRange(err: any): boolean {
  if (err.isAxiosError) {
    const response: AxiosResponse = err.response;

    if (response && response.data && response.data.message) {
      if (response.data.message === UNABLE_TO_RETRIEVE) {
        return true;
      }
    }
  }

  return false;
}

async function requestSidecarAPI(endpoint: string, headers: any) {
  const { data } = await axios.get(endpoint, {
    headers,
  });

  return data;
}
