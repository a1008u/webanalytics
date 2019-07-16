import { storeInLocalStorage, getLocalStorage } from "../../src/common/localstorage";

describe('llocalstorageの確認', () => {

    afterEach(() => {
        localStorage.clear()
    })

    test('keyが存在', async () => {
        storeInLocalStorage("test")
        const actual = await getLocalStorage("_atuid")
        expect(actual).toEqual("test")
    });
    test('keyが存在しない', async () => {
        storeInLocalStorage("t")
        const actual = await getLocalStorage("_a")
        expect(actual).not.toEqual("t")
    });
});