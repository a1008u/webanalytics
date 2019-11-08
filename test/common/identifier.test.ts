import { storeInLocalStorage, getLocalStorage, removeLocalStorage } from "../../src/common/localstorage";
import { getIdentifier } from "../../src/common/identifier";

describe('identifierの確認', () => {

    afterEach(() => {
        localStorage.clear()
    })

    test('keyが存在', async () => {
        storeInLocalStorage("_atir","12")
        const actual = await getIdentifier("_atir")
        expect(actual).toEqual(12)
    });

    test('keyが存在(最大値チェック))', async () => {
        storeInLocalStorage("_atir","9007199254740993")
        const actual = await getIdentifier("_atir")
        expect(actual).toEqual(0)
    });

    test('keyが存在しない', async () => {
        const actual = await getIdentifier("_xxx")
        expect(actual).toEqual(0)
    });
});