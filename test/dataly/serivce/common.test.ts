import { mkDateTime, pixelDepth, closeExec} from "../../../src/dataly/service/common";
import {ur,ck,pr,sl,st,ed,resultjson} from "../../../src/dataly/domain/resultjson";

describe('mkDateTimeのテスト', () => {
  test('正常', async () => {
    // test結果の準備
    const date = new Date();
    const expectDateJST: string = date.getFullYear()
    + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2)
    + ' ' + ('0' + date.getHours()).slice(-2)
    + ':' + ('0' + date.getMinutes()).slice(-2);

    // exe
    const resultDateJST = mkDateTime()

    // ck
    expect(resultDateJST).toContain(expectDateJST);
  });
});

describe('pixelDepthのテスト', () => {
  test('正常', async () => {
    // test結果の準備

    // exe
    const scrollJson = await pixelDepth()

    // ck
    expect(scrollJson.ct).toEqual(0);
    expect(scrollJson.dt).toEqual(0);
    expect(scrollJson.sp).toEqual(0);
  });
});

// describe('clickDepthのテスト', () => {
//   test('正常', async () => {
//     // test結果の準備

//     // exe
//     const actualClick = await clickDepth(MouseEvent)

//     // ck
//     const expectclick :click = new click(1,2)
//     expect(actualClick).toEqual(expectclick);
//   });
// });

// TODO:時間があったら実装
// describe('closeExecのテスト', () => {
//   test('正常', async () => {

//     const mockFn = jest.fn().mockName('sendBeacon');

//     // test結果の準備
//     const expectuser:user = new user("test1","test2","test3","test4")
//     const expectpartner:partner = new partner("test5","test6")
//     const expectstart: start = new start(1,"test7",2,3)
//     const expectclick :click = new click(5,6)
//     const expectscroll: scroll = new scroll(7,8,9)
//     const expectclicks:Array<click> = new Array<click>(expectclick)
//     const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, expectclicks)
    
//     global.navigator.geolocation = mockGeolocation;

//     // exe
//     await closeExec(expectresultjson, 4)

//     // ck
//     expect(mockFn ).toHaveBeenCalled()
//   });
// });