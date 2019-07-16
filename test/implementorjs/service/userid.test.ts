import { getUid } from "../../../src/implementorjs/service/userid";
import { storeInLocalStorage } from "../../../src/common/localstorage";

describe('getUid', () => {
    beforeEach(() => {
        sessionStorage.clear()
    });
    test('正常_自動生成', async () => {
        // exe
        const result = await getUid("_atuid")

        // ck
        expect("test1234").not.toEqual(result)
    });
    test('正常_sessionstorageからの取得', async () => {
        // sesseionに追加
        storeInLocalStorage("test")
  
        // exe
        const result = await getUid("_atuid")

        // ck
        expect("test").toEqual(result)
    });
    test('正常_自動生成', async () => {
        // urlの書き換え
        window.history.pushState({}, 'Test Title', '/test.html?atud=test1234');
        storeInLocalStorage("test")
  
        // exe
        const result = await getUid("test")

        // ck
        expect("test").not.toEqual(result)
    });
  });