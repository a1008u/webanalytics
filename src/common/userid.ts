import {
  storeInLocalStorage,
  getLocalStorage
} from "./localstorage";
import uuidv4 from "uuid/v4";
import sha1 from "sha1";

/**
 * Uid(user ID)の所得順序
 * 1.localstorageから取得
 * 2.クエリーパラメータから取得
 * 3.uuidv4を利用して、生成
 *
 * @param uidKey
 */
async function getUid(uidKey: string): Promise<string> {
  // localstorageck
  const atuid: string | null = await getLocalStorage(uidKey);
  if (atuid) {
    // console.log("local storageから取得 : ", atuid);
    return atuid;
  }
  const uidSha1 = sha1(uuidv4());
  // console.log("sha1(uuidv4())から取得 : ", uidSha1);
  storeInLocalStorage("_atuid", uidSha1);
  return uidSha1;
}

async function storeUid(uidKey: string): Promise<void> {
  // localstorageck
  const atuid: string | null = await getLocalStorage(uidKey);
  if (atuid) {
    // console.log("local storageから取得 : ", atuid);
    return;
  }
  const uidSha1 = sha1(uuidv4());
  // console.log("sha1(uuidv4())から取得 : ", uidSha1);
  storeInLocalStorage("_atuid", uidSha1);
  return;
}

export { getUid, storeUid };
