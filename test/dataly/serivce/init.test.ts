import { init } from "../../../src/dataly/service/init";
import {ur,ck,pr,sl,st,ed,resultjson} from "../../../src/dataly/domain/resultjson";
import { storeInLocalStorage} from "../../../src/common/localstorage";


describe('initのテスト', () => {

  beforeEach(() => {
    document.body.innerHTML = `<script async id='__at_dataly' __dsd="test" ></script>`;
    storeInLocalStorage("test")
  });
  afterEach(() => {
    let element = document.getElementById('__at_dataly');
    element.parentNode.removeChild(element);
  });

test('正常', async () => {

  // expectの準備
  const expecth:number = 1000
  const expectclienth:number = 100
  const expectuser:ur = new ur("test","","http://localhost:8080/test.html",window.navigator.userAgent.toLowerCase(),)
  const expectpartner:pr = new pr("test","")
  const expectstart: st = new st(expectclienth,"test7",expecth,0)
  const expectscroll: sl = new sl(0,0,0)
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, new Array<ck>())
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe
  let actualResultjson = await init(expecth, expectclienth)

  // ck
  expect(actualResultjson.ck).toEqual(expectresultjson.ck);
  expect(actualResultjson.ed).toEqual(expectresultjson.ed);
  expect(actualResultjson.pr).toEqual(expectresultjson.pr);
  expect(actualResultjson.sl).toEqual(expectresultjson.sl);
  expect(actualResultjson.st.ct).toEqual(expectresultjson.st.ct);
  expect(actualResultjson.st.de).toContain(expectDateJST);
  expect(actualResultjson.st.dt).toEqual(expectresultjson.st.dt);
  expect(actualResultjson.st.sp).toEqual(expectresultjson.st.sp);
  expect(actualResultjson.ur).toEqual(expectresultjson.ur);
  });
});