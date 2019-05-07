async function changeQuery(queryKey, queryValue){
  [].forEach.call(document.getElementsByTagName('a'), aTag => {
    const targetAtagHref = aTag.getAttribute('href');
    const need = (aTag.getAttribute('href').includes("attestat"))? true: false;
    if (need) {
      const exQuery = `${queryKey}=${queryValue}`
      if (targetAtagHref.indexOf('#') !== -1) {
        let [url, hash] = aTag.getAttribute('href').split('#');
        aTag.href =
          targetAtagHref.indexOf('?') !== -1
            ? `${url}&${exQuery}#${hash}`
            : `${url}?${exQuery}#${hash}`;
      } else {
        aTag.href =
          targetAtagHref.indexOf('?') === -1
            ? `${targetAtagHref}?${exQuery}`
            : `${targetAtagHref}&${exQuery}`;
      }
    }
  })
}

function getQueryTargetKeyValue(query, targetKey){
  if(query){
    const targetQuery = query.split('&').find(q => q.includes(targetKey))
    if(!targetQuery){
      return null
    }
    const [_, value] = targetQuery.split('=')
    return value;
  }
  return null;
}

export {changeQuery, getQueryTargetKeyValue}