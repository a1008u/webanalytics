import { storeInLocalStorage, getLocalStorage } from "../../common/localstorage";
import { getQueryTargetKeyValue } from "./query";
import { v4 as UUID } from 'uuid';

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
  
    // paramck
    const queryUid: string|null = getQueryTargetKeyValue(location.search.substring(1), "id=")
    if(queryUid){
      console.log("paramから取得 : ", queryUid)
      storeInLocalStorage(queryUid)
      return queryUid;
    }
  
    const uuid: string = UUID();
    console.log("uuidv4()から取得 : ", uuid)
    storeInLocalStorage(uuid)
    return uuid
  }

  export {getUid}