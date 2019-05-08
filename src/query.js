async function changeQuery(targetkey, queryKey, queryValue){
  [].forEach.call(document.getElementsByTagName('a'), aTag => {
    const targetAtagHref = aTag.getAttribute('href');
    const need = (aTag.getAttribute('href').includes(targetkey))? true: false;
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

async function getFixUrl(targetAtagHref, queryKey){
  const [baseurl, query] = targetAtagHref.split("?")
  let fixQuery = "";
  for (let q of query.split("&")) {
    const [key, value] = q.split("=")
    if (key !== queryKey){
      fixQuery += fixQuery ? `&${key}=${value}` : `?${key}=${value}`
    }
  }
  return [baseurl, fixQuery]
}

async function deleteQuery(targetkey, queryKey){
  [].forEach.call(document.getElementsByTagName('a'), async aTag => {
    const targetAtagHref = aTag.getAttribute('href');
    const need = targetAtagHref.includes(targetkey) ? true: false;
    if (need) {
      if (targetAtagHref.indexOf('#') !== -1) {
        const [_, hash] = targetAtagHref.split('#');
        // const [baseurl, query] = aTag.getAttribute('href').split("?")
        // let fixQuery = "";
        // for (let q of query.split("&")) {
        //   const [key, value] = q.split("=")
        //   if (key !== queryKey){
        //     fixQuery += fixQuery ? `&${key}=${value}` : `?${key}=${value}`
        //   }
        // }
        const [baseurl, fixQuery] = await getFixUrl(targetAtagHref, queryKey)
        aTag.href = `${baseurl}${fixQuery}#${hash}`;
      } else {
        // const [baseurl, query] = aTag.getAttribute('href').split("?")
        // let fixQuery = "";
        // for (let q of query.split("&")) {
        //   const [key, value] = q.split("=")
        //   if (key !== queryKey){
        //     fixQuery += fixQuery ? `&${key}=${value}` : `?${key}=${value}`
        //   }
        // }
        const [baseurl, fixQuery] = await getFixUrl(targetAtagHref, queryKey)
        aTag.href = `${baseurl}${fixQuery}`;
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

export {changeQuery, getQueryTargetKeyValue, deleteQuery}