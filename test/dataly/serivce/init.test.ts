import { init } from "../../../src/dataly/service/init";
import {ur,pr,sl,st,resultjson, sd} from "../../../src/dataly/domain/resultjson";
import { storeInLocalStorage} from "../../../src/common/localstorage";

describe('initのテスト', () => {

  beforeEach(() => {
    document.body.innerHTML = `<script async id='__at_dataly' __dsd="test" ></script>`;
    storeInLocalStorage("_atuid","test")
  });
  afterEach(() => {
    let element = document.getElementById('__at_dataly');
    element.parentNode.removeChild(element);
  });

test('正常', async () => {

  // expectの準備
  const expectuser:ur = new ur(null, null, 0,"","http://localhost:8080/test.html", window.navigator.userAgent, null, Intl.DateTimeFormat().resolvedOptions().timeZone, null, null)
  const expectpartner:pr = new pr("test","")

  const clienth = Math.floor(document.documentElement.clientHeight);
  const h = Math.floor(document.documentElement.scrollHeight);
  const scrollTop: number = Math.floor(document.documentElement.scrollTop);
  const expectstart: st = new st(clienth, '', '', "test7", h, scrollTop)

  const expectscroll: sl = new sl(0,0,0)
  const expectsendData:sd = new sd(null)
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, expectsendData)
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe
  let actualResultjson = await init()

  // ck
  expect(actualResultjson.ur.ad).toEqual(expectresultjson.ur.ad);
  expect(actualResultjson.ur.cd).not.toBeNull;
  expect(actualResultjson.ur.ao).toEqual(expectresultjson.ur.ao);
  expect(actualResultjson.ur.rr).toEqual(expectresultjson.ur.rr);
  expect(actualResultjson.ur.url).toEqual(expectresultjson.ur.url);
  expect(actualResultjson.ur.ua).toEqual(expectresultjson.ur.ua);
  expect(actualResultjson.ur.ip).toEqual(expectresultjson.ur.ip);
  expect(actualResultjson.ur.zn).toEqual(expectresultjson.ur.zn);
  expect(actualResultjson.ur.ac).toEqual(expectresultjson.ur.ac);
  expect(actualResultjson.ur.ar).toEqual(expectresultjson.ur.ar);

  expect(actualResultjson.ed).toEqual(expectresultjson.ed);
  expect(actualResultjson.pr).toEqual(expectresultjson.pr);
  expect(actualResultjson.sl).toEqual(expectresultjson.sl);
  expect(actualResultjson.st.ct).toEqual(expectresultjson.st.ct);
  expect(actualResultjson.st.dl).toContain(expectDateJST);
  expect(actualResultjson.st.dt).toEqual(expectresultjson.st.dt);
  expect(actualResultjson.st.sp).toEqual(expectresultjson.st.sp);
  expect(actualResultjson.sd).toEqual(expectresultjson.sd);
  });
});