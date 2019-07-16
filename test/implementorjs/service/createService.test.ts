import { mkDataly } from "../../../src/implementorjs/service/createService";
import { Baseurl, Optionurl, CertificationJson } from "../../../src/implementorjs/domain/certificateJson";

describe('dataly作成', () => {
  test('正常', async () => {
    // 準備
    const bL:Baseurl = new Baseurl("dataly","xxx")
    const oL:Optionurl = new Optionurl("","")
    const oLs:Array<Optionurl> = new Array<Optionurl>(oL)
    const expectCertificationJson :CertificationJson = new CertificationJson("dataly",bL,oLs)

    // exe
    const result = await mkDataly(expectCertificationJson)

    // ck
    const datalyScriptElement:HTMLElement = document.getElementById("__at_dataly")
    expect(datalyScriptElement.getAttribute("__dsd")).toEqual('dataly');
  });
});