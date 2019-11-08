import { storeInLocalStorage, getLocalStorage } from "./localstorage";
import uuidv4 from "uuid/v4";
import sha1 from "sha1";

/**
 * Uid(user ID)の所得
 * 1.localstorageから取得
 * 2.uuidv4を利用して、生成
 *
 * @param uidKey
 */
async function getUid(uidKey: string): Promise<string> {
  // 1.localstorageから取得
  const atuid: string | null = await getLocalStorage(uidKey);
  if (atuid) {
    return atuid;
  }
  // 2.uuidv4を利用して、生成
  const uidSha1 = sha1(uuidv4());
  storeInLocalStorage(uidKey, uidSha1);
  return uidSha1;
}

/**
 * Uid(user ID)の格納
 * 1.localstorageから取得できたら格納しない
 * 2.新規で発行した場合は、格納
 * @param uidKey 
 */
async function storeUid(uidKey: string): Promise<void> {
  // 1.localstorageから取得できたら格納しない
  const atuid: string | null = await getLocalStorage(uidKey);
  if (atuid) {
    return;
  }
  // 2.新規で発行した場合は、格納
  const uidSha1 = sha1(uuidv4());
  storeInLocalStorage(uidKey, uidSha1);
  return;
}

export { getUid, storeUid };
