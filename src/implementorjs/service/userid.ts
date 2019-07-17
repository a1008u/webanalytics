import { storeInLocalStorage, getLocalStorage } from "../../common/localstorage";
import { getQueryTargetKeyValue } from "./query";
import uuidv4 from 'uuid/v4';
import sha256 from 'sha256';

/**
 * Uid(user ID)の所得順序
 * 1.localstorageから取得
 * 2.クエリーパラメータから取得
 * 3.uuidv4を利用して、生成
 * 
 * @param uidKey
 */
async function getUid(uidKey: string) : Promise<string>{
  // localstorageck
  const atuid: string|null = await getLocalStorage(uidKey)
  if(atuid){
    console.log("local storageから取得 : ", atuid)
    return atuid;
  }
  const uidSha256 = sha256(uuidv4())
  console.log("sha256(uuidv4())から取得 : ", uidSha256)
  storeInLocalStorage(uidSha256)
  return uidSha256
}

  export {getUid}