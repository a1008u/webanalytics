import {ur,pr,sl,st,at,resultjson} from "../../../src/dataly/domain/resultjson";
import { storeInLocalStorage} from "../../../src/common/localstorage";
import { changeAnchorQuery } from "../../../src/dataly/service/query";

describe('queryのテスト', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <script async id='__at_dataly' __dsd="test" ></script>
      <a id="atAtest" href="https://localhost:8080/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        <img id="atItest" src="https://localhost:8080/sp/rr?rk=0100nprc000005" alt="test" border="0">
      </a>
      <a id="atAtest2" href="https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-1" rel="nofollow" target="_blank">
        <img id="atItest2" src="https://localhost:8080/sp/rr?rk=0100nprc000005&atud=test-1" alt="test" border="0">
      </a>
      <a id="atAtest3" href="https://localhost:8888/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        <img id="atItest3" src="https://localhost:8888/sp/rr?rk=0100nprc000005" alt="test" border="0">
      </a>
      <a id="atAtest4" href="https://localhost:8080/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        test
      </a>
    `;
    storeInLocalStorage("_atuid","test")
  });
  afterEach(() => {
    let element1 = document.getElementById('atAtest');
    let element2 = document.getElementById('atAtest2');
    let element3 = document.getElementById('atAtest3');
    let element4 = document.getElementById('__at_dataly');
    element1.parentNode.removeChild(element1);
    element2.parentNode.removeChild(element2);
    element3.parentNode.removeChild(element3);
    element4.parentNode.removeChild(element4);
  });

test('正常_changeAnchorQueryのテスト', async () => {

  // expectの準備
  const expecth:number = 1000
  const expectclienth:number = 100
  const expectuser:ur = new ur("test", 0,"","http://localhost:8080/test.html", window.navigator.userAgent, null, Intl.DateTimeFormat().resolvedOptions().timeZone, null, null)
  const expectpartner:pr = new pr("test","")
  const expectstart: st = new st(expectclienth,'','',"test7",expecth,0)
  const expectscroll: sl = new sl(0,0,0)
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null,null)
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe
  await changeAnchorQuery("_atir","localhost:8080", "atud", expectresultjson);

  const aTag: HTMLAnchorElement = document.getElementById("atAtest") as HTMLAnchorElement
  const aTag2: HTMLAnchorElement = document.getElementById("atAtest2") as HTMLAnchorElement
  const aTag4: HTMLAnchorElement = document.getElementById("atAtest4") as HTMLAnchorElement
  const imageTag: HTMLImageElement = document.getElementById("atItest") as HTMLImageElement
  const expectAt: at = new at(aTag.href, imageTag.src, imageTag.offsetTop, imageTag.clientHeight)

  aTag.click()
  // ck
  expect(expectresultjson.at).toBeNull;
  expect(expectresultjson.at[0]).toEqual(expectAt);
  expect(aTag.href).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-1");
  expect(aTag2.href).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-2");

  // tag押下の確認
  expect(expectresultjson.ur.ir).toEqual(1);
  expect(expectresultjson.ur.ac).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-1");

  // tag改ざん（imageがない）
  aTag4.click()
  expect(expectresultjson.ur.ir).toEqual(3);
  expect(expectresultjson.ur.ac).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-3");
  expect(expectresultjson.ur.ar).toEqual("");
  });
});