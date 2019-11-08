import {ur,pr,sl,st,at,resultjson} from "../../src/dataly/domain/resultjson";
import { scrollCkForReadrate, screenTransition } from "../../src/dataly/main";
import { storeInLocalStorage} from "../../src/common/localstorage";

describe('mainのテスト', () => {

  const OLD_ENV = process.env;

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
    localStorage.clear()
    storeInLocalStorage("_atuid","test")
    process.env = Object.assign(process.env, { DELIVERYURL: 'localhost:8080' });
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

test('scrollCkForReadrateのテスト正常', async () => {
  // expectの準備
  const expecth:number = 1000
  const expectclienth:number = 100
  const expectuser:ur = new ur("test", 0,"","http://localhost:8080/test.html", window.navigator.userAgent, null, Intl.DateTimeFormat().resolvedOptions().timeZone, null, null)
  const expectpartner:pr = new pr("test","")
  const expectstart: st = new st(expectclienth,'','',"test7",expecth,0)
  const expectSl = new sl(0,0,0)
  const expectscroll: sl = new sl(212,44343,-10)
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null,null)
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe(expectSlの値に変更されていること)
  await scrollCkForReadrate(expectresultjson);
  expect(expectresultjson.sl).toEqual(expectSl);
  });

  test('screenTransitionのテスト正常', async () => {

    // expectの準備
    const expecth:number = 1000
    const expectclienth:number = 100
    const expectuser:ur = new ur("test", 0,"","http://localhost:8080/test.html", window.navigator.userAgent, null, Intl.DateTimeFormat().resolvedOptions().timeZone, null, null)
    const expectpartner:pr = new pr("test","")
    const expectstart: st = new st(expectclienth,'','',"test7",expecth,0)
    const expectscroll: sl = new sl(212,44343,-10)
    const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null,null)
    const date = new Date();
    const expectDateJST: string = date.getFullYear()
    + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2)
    + ' ' + ('0' + date.getHours()).slice(-2)
    + ':' + ('0' + date.getMinutes()).slice(-2);
  
    // exe(初期化されていることを確認)
    const {resultJson, h, clienth} = await screenTransition(expectresultjson, 100, 100);
    expect(expectresultjson).not.toEqual(resultJson);
    expect(h).toEqual(0);
    expect(clienth).toEqual(0);
    });
});

