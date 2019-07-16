import { getQueryTargetKeyValue } from "../../../src/implementorjs/service/query";

const domain: string = 'http://localhost:3000?id=test1234';
const key : string =  "id="

describe('Query変更(url有, key有)', () => {
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
    const result = getQueryTargetKeyValue(domain,key)

    // ck
    expect("test1234").toEqual(result)
  });
});

describe('Query変更(url無, key有)', () => {
  test('正常', async () => {
    // exe
    const result = getQueryTargetKeyValue(null, key)

    // ck
    expect(null).toEqual(result)
  });
});

describe('Query変更(url有, key無)', () => {
  test('正常', async () => {
    // exe
    const result = getQueryTargetKeyValue(domain, "i=")

    // ck
    expect(null).toEqual(result)
  });
});