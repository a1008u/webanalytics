/**
 * localstorageからjsonを取得 + 有効期限内かを確認する
 * @param {string} key
 * @returns {paramjson}
 */
function getSesstionStorage(key: string) : boolean{
    const value: string = sessionStorage.getItem(key);
    return value === "true"? true: false;
  };
  
  /**
   * localstorageに値 + localstorageの有効期限を格納する
   * @param uuid
   */
  function storeSesstionStorage(isActive: string){
    sessionStorage.setItem('__atcstatus', isActive);
  }
  
  export {getSesstionStorage, storeSesstionStorage}