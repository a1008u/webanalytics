import { init } from "../../../src/dataly/service/init";
import {user,click,partner,scroll,start,end,resultjson} from "../../../src/dataly/domain/resultjson";
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
  const expectuser:user = new user("test","","http://localhost:8080/test.html",window.navigator.userAgent.toLowerCase(),)
  const expectpartner:partner = new partner("test","")
  const expectstart: start = new start(expectclienth,"test7",expecth,0)
  const expectscroll: scroll = new scroll(0,0,0)
  const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, new Array<click>())
  const date = new Date();
  const expectDateJST: string = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + ' ' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2);

  // exe
  let actualResultjson = await init(expecth, expectclienth)

  // ck
  expect(actualResultjson.click).toEqual(expectresultjson.click);
  expect(actualResultjson.end).toEqual(expectresultjson.end);
  expect(actualResultjson.partner).toEqual(expectresultjson.partner);
  expect(actualResultjson.scroll).toEqual(expectresultjson.scroll);
  expect(actualResultjson.start.clientheight).toEqual(expectresultjson.start.clientheight);
  expect(actualResultjson.start.datetime).toContain(expectDateJST);
  expect(actualResultjson.start.documentheight).toEqual(expectresultjson.start.documentheight);
  expect(actualResultjson.start.scrollTop).toEqual(expectresultjson.start.scrollTop);
  expect(actualResultjson.user).toEqual(expectresultjson.user);
  });
});