import { storeInLocalStorage, getLocalStorage, removeLocalStorage } from "../../src/common/localstorage";
import { storeUid, getUid } from "../../src/common/userid";

describe('useridの確認(getLocalStorage)', () => {

    afterEach(() => {
        localStorage.clear()
    })

    test('keyが存在しない(sha1(uuidv4())でuseridが作成されていうること)', async () => {
        let key : string = "_atuid"
        await storeUid(key)
        const actual = await getLocalStorage(key)
        expect(actual).not.toEqual("test")
    });

    test('keyが存在', async () => {
        let key : string = "_atuid"
        storeInLocalStorage(key,"9007199254740993")
        const actual = await storeUid(key)
        expect(actual).toEqual(undefined)
    });
});

describe('useridの確認(getUid)', () => {

    afterEach(() => {
        localStorage.clear()
    })
    test('keyが存在', async () => {
        localStorage.clear()
        let key : string = "_atuid"
        await storeUid(key)
        const actual = await getUid(key)
        expect(actual).not.toEqual(undefined)
    });

    test('keyが存在しない', async () => {
        localStorage.clear()
        let key : string = "_atuid_test"
        await storeUid(key)
        const actual = await getUid(key)
        expect(actual).not.toEqual(undefined)
    });
});