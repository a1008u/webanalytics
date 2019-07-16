import { storeSesstionStorage, getSesstionStorage } from "../../src/common/sessionstorage";
import { Baseurl, Optionurl, CertificationJson } from "../../src/implementorjs/domain/certificateJson";

describe('sessionStorageの確認', () => {

    afterEach(() => {
        sessionStorage.clear()
    })

    test('存在', async () => {
        const bL:Baseurl = new Baseurl("","")
        const oL:Optionurl = new Optionurl("","")
        const oLs:Array<Optionurl> = new Array<Optionurl>(oL)
        const expectCertificationJson :CertificationJson = new CertificationJson("dataly",bL,oLs)

        storeSesstionStorage("test", expectCertificationJson)
        const actual = await getSesstionStorage("test")
        expect(actual.SD).toEqual("dataly")
    });
});