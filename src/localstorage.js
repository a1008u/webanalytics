/**
 * localstorageからjsonを取得 + 有効期限内かを確認する
 * @param {string} key
 * @returns {paramjson}
 */
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value? value: null;
};

/**
 * localstorageに値 + localstorageの有効期限を格納する
 * @param {paramjson} paramJson
 * @param deadline
 */

function storeInLocalStorage(paramJson){
  localStorage.setItem('_atuid', paramJson);
}

export {getLocalStorage, storeInLocalStorage}