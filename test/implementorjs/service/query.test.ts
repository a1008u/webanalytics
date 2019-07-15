import { getQueryTargetKeyValue } from "../../../src/implementorjs/service/query";

const domain: string = 'http://localhost:3000?id=test1234';

describe('Query変更(プロダクション)(モック)', () => {
  // beforeEach(() => {
  //   document.body.innerHTML = `<script async id='mexec' data-atv-mock="true" data-atv-rk="010011a1_pc" ></script>`;
  //   jest.setTimeout(50000);
  // });
  // afterEach(() => {
  //   let element = document.getElementById('mexec');
  //   element.parentNode.removeChild(element);
  //   jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockRestore();
  //   jest.spyOn(Iframe.prototype, 'mainExec').mockRestore();
  // });
  test('正常', async () => {
    // spiの設定

    // exe
    const result = getQueryTargetKeyValue(domain, "id=")

    // ck
    expect("test1234").toEqual(result)
  });
});