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
 * @param uuid
 */
function storeInLocalStorage(uuid: string): void {
  localStorage.setItem("_atuid", uuid);
}

export { getLocalStorage, storeInLocalStorage };
