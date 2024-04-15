import { getSleep } from "../api/sleep";
export async function fetchSleep(tokenStore) {
  return await getSleep(tokenStore);
}
