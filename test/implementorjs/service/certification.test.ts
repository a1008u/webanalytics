import { Baseurl, Optionurl, CertificationJson, AccessJson } from "../../../src/implementorjs/domain/certificateJson";
import { ckCertificattionJson } from "../../../src/implementorjs/service/certification";
    
import {GlobalWithFetchMock} from "jest-fetch-mock";


describe('getCertificationStatusの動作確認', () => {

    beforeEach(() => {
        global.fetch.resetMocks()
        global.fetch.mockResponseOnce(JSON.stringify({ error: 'this is error' }))
    });

    test('正常_error時の対応', async () => {
      // 準備
      const bL:Baseurl = new Baseurl("dataly","xxx")
      const oL:Optionurl = new Optionurl("","")
      const oLs:Array<Optionurl> = new Array<Optionurl>(oL)
      const expectCertificationJson :CertificationJson = new CertificationJson("dataly",bL,oLs)
  
      // exe
      const accessJson: AccessJson = new AccessJson("","")
      const result = await ckCertificattionJson("testxxx", accessJson)

      // ck
      expect(result).toEqual(null)
    });
  });

describe('getCertificationStatusの動作確認', () => {

    const bL:Baseurl = new Baseurl("dataly","xxx")
    const oL:Optionurl = new Optionurl("","")
    const oLs:Array<Optionurl> = new Array<Optionurl>(oL)
    const expectCertificationJson :CertificationJson = new CertificationJson("dataly",bL,oLs)


    beforeEach(() => {
        global.fetch.resetMocks()
        global.fetch.mockResponseOnce(JSON.stringify(expectCertificationJson))
    });

    test('正常_errorが出ない', async () => {
        // spiの設定
        const em = require('../../../src/implementorjs/service/certification')
        const spy = jest.spyOn(em, 'getCertificationStatus').mockReturnValue(null);

        // exe
        const accessJson: AccessJson = new AccessJson("","")
        const result = await ckCertificattionJson("testxxx", accessJson)

        // ck
        expect(result).toEqual(expectCertificationJson)
    });
});