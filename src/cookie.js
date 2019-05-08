/**
 * 正規表現を用いて、cookieに[_atpm]が存在しているか確認する
 * @param {string} sKey
 * @returns {boolean}
 */
export let hasItem = (sKey) =>
  new RegExp(
    '(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\='
  ).test(document.cookie);


function getItem(sKey) {
  if (!sKey || !hasItem(sKey)) {
    return null;
  }
  return unescape(
    document.cookie.replace(
      new RegExp(
        '(?:^|.*;\\s*)' +
          escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
          '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'
      ),
      '$1'
    )
  );
};

  /**
   * CookieからJSONを取得する
   * @param {string} key
   * @returns {paramjson}
   */
async function getCookie(key) {
  const value = getItem(key);
  return value ? value : null;
};

// cookieの有効期限を90日として保持させる
function setItem(sKey, sValue,deadline,sPath,sDomain,bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return;
  }
  const date = new Date();
  // date.setUTCDate(date.getUTCDate() + deadline);
  date.setUTCHours(date.getUTCHours() + deadline);
  document.cookie = `${escape(sKey)}=${escape(sValue)}; path=${sPath ? sPath : ''}; expires=${date.toUTCString()}${bSecure ? '; secure' : ''}`;
}

function storeInCookie(atpno){
  setItem(
    '_atpno',
    atpno,
    1,
    '/',
    location.hostname,
    false
  );
}

export {storeInCookie, getCookie}