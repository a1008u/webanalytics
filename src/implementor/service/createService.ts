import { CertificationJson } from "../domain/certificateJson";

/**
 * [タグ生成] Dataly用のタグを生成
 * 1.scriptタグの生成
 * 2.属性の追加（datalyで利用するuseridを設定 + srcを追加）
 * 3.scriptタグを貼り付け
 * @param sessionStorageKey
 * @param certificationJson
 */
async function mkDataly(certificationJson: CertificationJson): Promise<void> {
  // 1.scriptタグの生成
  const scriptElement: HTMLScriptElement = document.createElement("script");
  // 2.属性の追加（datalyで利用するuseridを設定 + srcを追加）
  scriptElement.id = "__at_dataly";
  scriptElement.setAttribute("__dsd", certificationJson.SD);
  scriptElement.setAttribute("src", certificationJson.BL.TG);
  // 3.scriptタグを貼り付け
  document.head.appendChild(scriptElement);

  // テスト時の確認用
  // console.log("Datalyの設定完了");
}

export { mkDataly };
