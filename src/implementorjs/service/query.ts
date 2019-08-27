/**
 * [パラメータ書き換え] accesstradeタグにuseridを付与する
 * @param targetkey
 * @param queryKey
 * @param queryValue
 */
async function changeQuery(
  targetkey: string,
  queryKey: string,
  queryValue: string
): Promise<void> {
  [].forEach.call(
    document.getElementsByTagName("a"),
    (aTag: HTMLAnchorElement): void => {
      const targetAtagHref = aTag.getAttribute("href");
      const need = aTag.getAttribute("href").includes(targetkey) ? true : false;
      if (need) {
        const exQuery = `${queryKey}=${queryValue}`;
        if (targetAtagHref.indexOf("#") !== -1) {
          const [url, hash] = aTag.getAttribute("href").split("#");
          aTag.href =
            targetAtagHref.indexOf("?") !== -1
              ? `${url}&${exQuery}#${hash}`
              : `${url}?${exQuery}#${hash}`;
        } else {
          aTag.href =
            targetAtagHref.indexOf("?") === -1
              ? `${targetAtagHref}?${exQuery}`
              : `${targetAtagHref}&${exQuery}`;
        }
      }
    }
  );
}

function getQueryTargetKeyValue(
  query: string,
  targetKey: string
): string | null {
  if (query) {
    const targetQuery = query
      .split("&")
      .find((q): boolean => q.includes(targetKey));
    if (!targetQuery) {
      return null;
    }
    const [, value] = targetQuery.split("=");
    return value;
  }
  return null;
}

export { changeQuery, getQueryTargetKeyValue };
