import { api } from "./api";
export async function getSleep(tokenStore) {
  return await api().get(`/program/${tokenStore}`);
}
