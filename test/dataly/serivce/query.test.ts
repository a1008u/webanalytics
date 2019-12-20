import {ur,pr,sl,st,resultjson, sd} from "../../../src/dataly/domain/resultjson";
import { storeInLocalStorage} from "../../../src/common/localstorage";
import { changeAnchorQuery } from "../../../src/dataly/service/query";

describe('queryのテスト', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <script async id='__at_dataly' __dsd="test" ></script>

      <!-- アクトレ推奨リンク設定で貼った場合 -->
      <a id="atAtest" href="https://localhost:8080/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        <img id="atItest" src="https://localhost:8080/sp/rr?rk=0100nprc000005" alt="test" border="0">
      </a>

      <!-- アクトレ推奨リンク設定で貼った場合（すでにdatalyパラメータ存在 タブ遷移確認用） -->
      <a id="atAtest2" href="https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-aaa-1" rel="nofollow" target="_blank">
        <img id="atItest2" src="https://localhost:8080/sp/rr?rk=0100nprc000005&atud=test-aaa-" alt="test" border="0">
      </a>

      <!-- アクトレ推奨リンク設定で貼った場合（対象href出ない） -->
      <a id="atAtest3" href="https://localhost:8888/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        <img id="atItest3" src="https://localhost:8888/sp/rr?rk=0100nprc000005" alt="test" border="0">
      </a>

      <!-- アクトレ推奨リンク設定で貼った場合（imgタグがない不正タグ） -->
      <a id="atAtest4" href="https://localhost:8080/sp/cc?rk=0100nprc000005" rel="nofollow" target="_blank">
        test
      </a>

      <!-- 非公開機能のテスト用（パラメータがatduだけ） -->
      <a id="atAtest5" href="https://www.xxx.com/test?atud=" rel="nofollow" target="_blank">
        test
      </a>

      <!-- 非公開機能のテスト用 （パラメータがatdu以外も存在）-->
      <a id="atAtest6" href="https://www.xxx.com/test?some=test&atud=" rel="nofollow" target="_blank">
        test
      </a>

      <!-- 非公開機能のテスト用 （パラメータがatdu以外も存在かつhash対応も確認）-->
      <a id="atAtest7" href="https://www.xxx.com/test?some=test&atud=&some2=test#test" rel="nofollow" target="_blank">
        test
      </a>

      <!-- 非公開機能のテスト用 （visibleのhiddenからvisibleに変更した時を想定（すでにatudが設定されている）、パラメータがatdu以外も存在かつhash対応も確認）-->
      <a id="atAtest8" href="https://www.xxx.com/test?some=test&atud=test-bbb-7&some2=test#test" rel="nofollow" target="_blank">
        test
      </a>
    `;
    storeInLocalStorage("_atuid","test")
    process.env = Object.assign(process.env, { QUERYKEY: 'atud'});
  });
  afterEach(() => {
    let element1 = document.getElementById('atAtest');
    let element2 = document.getElementById('atAtest2');
    let element3 = document.getElementById('atAtest3');
    let element5 = document.getElementById('atAtest5');
    let element6 = document.getElementById('atAtest6');
    let element7 = document.getElementById('atAtest7');
    let element8 = document.getElementById('atAtest8');
    let element4 = document.getElementById('__at_dataly');
    element1.parentNode.removeChild(element1);
    element2.parentNode.removeChild(element2);
    element3.parentNode.removeChild(element3);
    element4.parentNode.removeChild(element4);
    element5.parentNode.removeChild(element5);
    element6.parentNode.removeChild(element6);
    element7.parentNode.removeChild(element7);
    element8.parentNode.removeChild(element8);
  });

test('正常_changeAnchorQueryのテスト', async () => {

  // expectの準備
  const expecth:number = 1000
  const expectclienth:number = 100
  const expectAd: string = "test"
  const expectCd: string = "zzz"
  const expectuser:ur = new ur(expectAd, expectCd, 0,"","http://localhost:8080/test.html", window.navigator.userAgent, null, Intl.DateTimeFormat().resolvedOptions().timeZone, null, null)
  const expectpartner:pr = new pr(expectAd,"")
  const expectstart: st = new st(expectclienth,'','',"test7",expecth,0)
  const expectscroll: sl = new sl(0,0,0)
  const expectsendData: sd = new sd("")
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, expectsendData)
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe
  await changeAnchorQuery("localhost:8080", "atud", expectresultjson);

  const aTag: HTMLAnchorElement = document.getElementById("atAtest") as HTMLAnchorElement
  const aTag2: HTMLAnchorElement = document.getElementById("atAtest2") as HTMLAnchorElement
  const aTag3: HTMLAnchorElement = document.getElementById("atAtest3") as HTMLAnchorElement
  const aTag4: HTMLAnchorElement = document.getElementById("atAtest4") as HTMLAnchorElement
  const aTag5: HTMLAnchorElement = document.getElementById("atAtest5") as HTMLAnchorElement
  const aTag6: HTMLAnchorElement = document.getElementById("atAtest6") as HTMLAnchorElement
  const aTag7: HTMLAnchorElement = document.getElementById("atAtest7") as HTMLAnchorElement
  const aTag8: HTMLAnchorElement = document.getElementById("atAtest8") as HTMLAnchorElement
  const imageTag: HTMLImageElement = document.getElementById("atItest") as HTMLImageElement

  // ck
  expect(aTag.href).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-1");
  expect(aTag2.href).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-2");
  expect(aTag3.href).toEqual("https://localhost:8888/sp/cc?rk=0100nprc000005");
  expect(aTag4.href).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-3");
  expect(aTag5.href).toEqual("https://www.xxx.com/test?atud=test-zzz-4");
  expect(aTag6.href).toEqual("https://www.xxx.com/test?some=test&atud=test-zzz-5");
  expect(aTag7.href).toEqual("https://www.xxx.com/test?some=test&atud=test-zzz-6&some2=test#test");
  expect(aTag8.href).toEqual("https://www.xxx.com/test?some=test&atud=test-zzz-7&some2=test#test");

  // tag押下の確認
  aTag3.click()
  expect(expectresultjson.ur.ad).toEqual(expectAd);
  expect(expectresultjson.ur.cd).toEqual(expectCd);
  expect(expectresultjson.ur.ao).toEqual(0);
  expect(expectresultjson.ur.ar).toBeNull;
  expect(expectresultjson.ur.ac).toBeNull;
  expect(expectresultjson.sd.tr).toBeNull; // 別メソッドで「impression」が入るため、ここはnull

  // tag押下の確認
  aTag.click()
  expect(expectresultjson.ur.ad).toEqual(expectAd);
  expect(expectresultjson.ur.cd).toEqual(expectCd);
  expect(expectresultjson.ur.ao).toEqual(1);
  // expect(expectresultjson.ur.ar).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-1");
  expect(expectresultjson.ur.ac).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-1");
  expect(expectresultjson.sd.tr).toEqual("click");

  // tag改ざん（imageがない）
  aTag4.click()
  expect(expectresultjson.ur.ad).toEqual(expectAd);
  expect(expectresultjson.ur.cd).toEqual(expectCd);
  expect(expectresultjson.ur.ao).toEqual(3);
  expect(expectresultjson.ur.ac).toEqual("https://localhost:8080/sp/cc?rk=0100nprc000005&atud=test-zzz-3");
  expect(expectresultjson.ur.ar).toEqual("");
  expect(expectresultjson.sd.tr).toEqual("click");
  });
});