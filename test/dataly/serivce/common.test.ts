import { mkDateTime, pixelDepth, closeExec} from "../../../src/dataly/service/common";
import {ur,ck,pr,sl,st,ed,resultjson, sd} from "../../../src/dataly/domain/resultjson";
import { utcToZonedTime, format }  from 'date-fns-tz'

describe('mkDateTimeのテスト', () => {
  test('正常_正確に時間が取れていることを確認', async () => {
    // test結果の準備
    const DataAyformat = "yyyy-MM-dd HH:mm:ss.SSS";
    const nowDate = new Date()

    // exe
    const resultDateJST = mkDateTime()

    // ck(TimeZone, TimeZoneから推測されるローカル時刻, UTCの時刻, 日本時刻)の順で確認
    expect(resultDateJST[0]).toContain(Intl.DateTimeFormat().resolvedOptions().timeZone);
    expect(resultDateJST[1]).toContain(format(nowDate, DataAyformat));
    expect(resultDateJST[2]).toContain(format(utcToZonedTime(nowDate, 'UTC'), DataAyformat));
    expect(resultDateJST[3]).toContain(format(utcToZonedTime(nowDate, "Asia/Tokyo"), DataAyformat));
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

describe('closeExecのテスト(sendBeaconが呼ばれた)', () => {
  test('正常_sendBeaconが実行されたかの確認', async () => {

    // mockの作成
    const mockFn = jest.fn((t,s) => true);
    window.navigator.sendBeacon = mockFn;

    // test結果の準備
    const expectuser:ur = new ur("test1","test11", 1,"test3","test4","test1","test2","test3","test4","test5")
    const expectpartner:pr = new pr("test5","test6")
    const expectstart: st = new st(1,"test7","test8","test7",2,3)
    const expectscroll: sl = new sl(7,8,9)
    const expectsendData:sd = new sd("") 
    const expectresultjson: resultjson = new resultjson(expectuser,expectpartner,expectscroll, expectstart, null, expectsendData)

    // exe
    await closeExec(expectresultjson, 4,'impression')
    await closeExec(expectresultjson, 3,'click')

    // ck
    expect(mockFn).toHaveBeenCalled()
  });
});