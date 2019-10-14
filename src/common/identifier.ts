
import {
  storeInLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from "./localstorage";

/**
 * atuidとは別に付ける識別子(Identifier)
 * @param identifierKey
 */
async function getIdentifier(IdentifierKey: string): Promise<number> {
  // localstorage_ck
  const datalyIdentifier: string | null = await getLocalStorage(IdentifierKey);
  if (datalyIdentifier) {
    // console.log("local storageから取得 : ", datalyIdentifier);
    await removeLocalStorage(IdentifierKey);

    // varifyの値はjsの最大値9007199254740992までとする
    return Number(datalyIdentifier) + 1 < 9007199254740993 ? Number(datalyIdentifier) : 0
  }

  // 初回
  return 0
}

// async function getIdentifier(IdentifierKey: string): Promise<string> {

// }

export { getIdentifier };