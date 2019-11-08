import { saveAndMkTag, implementor } from "../../src/implementor/main";
import { UseService } from "../../src/implementor/domain/useService";
import { CertificationJson, Baseurl, Optionurl, AccessJson} from "../../src/implementor/domain/certificateJson";
import { mkDataly } from "../../src/implementor/service/createService";
import { getLocalStorage, storeInLocalStorage } from "../../src/common/localstorage";
import { getSesstionStorage, storeSesstionStorage } from "../../src/common/sessionstorage";

const useService: UseService = {
  DatAly: (
    sessionStorageKey: string,
    certificationJson: CertificationJson
  ): Promise<void> => mkDataly(certificationJson)
  // 下記に外部連携のメソッドを追加する
  // unknown: (
  //   sessionStorageKey: string,
  //   certificationJson: CertificationJson
  // ) => {}
};

declare let __atinfo: AccessJson;
describe('mainのテスト', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    process.env = Object.assign(process.env, { DELIVERYURL: 'localhost:8080',SESSIONSTORAGEKEY:'__atcertification',LOCALSTORAGEKEY:'__atud'});
  });
  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  });


  // package.jsonのjestのglobalsに__atinfoを作成
  test('タグ生成の確認正常_自動生成', async () => {

      // exe
      const OL1: Optionurl = new Optionurl("","")
      const OL2: Optionurl = new Optionurl("","")
      const OLARRAY = [OL1, OL2]
      const BL: Baseurl = new Baseurl("DatAly", "http://localhost:8080/te.html")
      const certificationJson: CertificationJson = new CertificationJson("", BL, OLARRAY)
      await saveAndMkTag("__atcertification","__atud", certificationJson, useService)

      // ck
      // tag生成の確認
      let element: HTMLScriptElement = document.getElementById('__at_dataly') as HTMLScriptElement;
      expect(element.src).toEqual("http://localhost:8080/te.html")

      // sessionstorageの確認
      const actualSesstionStorage: CertificationJson = await getSesstionStorage("__atcertification")
      expect(actualSesstionStorage).toEqual(certificationJson)

      // localstorageの確認
      const actual = await getLocalStorage("__atud")
      expect(actual).not.toBeNull
  });

  test('タグ生成の確認(sesstionstoarageに存在)正常_自動生成', async () => {

      const OL1: Optionurl = new Optionurl("","")
      const OL2: Optionurl = new Optionurl("","")
      const OLARRAY = [OL1, OL2]
      const BL: Baseurl = new Baseurl("DatAly", "http://localhost:8080/te.html")
      const certificationJson: CertificationJson = new CertificationJson("", BL, OLARRAY)
      storeSesstionStorage("__atcertification", certificationJson)

      // exe
      await implementor(__atinfo, useService)

      // ck
      // tag生成の確認
      let element: HTMLScriptElement = document.getElementById('__at_dataly') as HTMLScriptElement;
      expect(element.src).toEqual("http://localhost:8080/te.html")

      // sessionstorageの確認
      const actualSesstionStorage: CertificationJson = await getSesstionStorage("__atcertification")
      expect(actualSesstionStorage).toEqual(certificationJson)

      // localstorageの確認
      const actual = await getLocalStorage("__atud")
      expect(actual).not.toBeNull
  });
});
