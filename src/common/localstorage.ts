/**
 * localstorageからjsonを取得 + 有効期限内かを確認する
 * @param {string} key
 * @returns {paramjson}
 */
async function getLocalStorage(key: string): Promise<string | null> {
  const value: string = localStorage.getItem(key);
  return value ? value : null;
}

/**
 * localstorageに値 + localstorageの有効期限を格納する
 * @param key
 * @param value
 */
function storeInLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

/**
 * localStoregeの指定したkeyの削除
 * @param key
 */
async function removeLocalStorage(key: string): Promise<void> {
  localStorage.removeItem(key);
}

export { getLocalStorage, storeInLocalStorage, removeLocalStorage };
