/**
 * localstorageからjsonを取得 + 有効期限内かを確認する
 * @param {string} key
 * @returns {paramjson}
 */
function getLocalStorage(key: string) : string| null{
  const value: string = localStorage.getItem(key);
  return value? value: null;
};

/**
 * localstorageに値 + localstorageの有効期限を格納する
 * @param uuid
 */
function storeInLocalStorage(uuid: string){
  localStorage.setItem('_atuid', uuid);
}

export {getLocalStorage, storeInLocalStorage}