import { CertificationJson } from "./certificateJson";

/**
 * implementorを利用して、外部アクセスさせるためのinterface
 * 必須：DatAly
 * オプション：都度追加
 */
interface UseService {
  DatAly: (
    sessionStorageKey: string,
    certificationJson: CertificationJson
  ) => Promise<void>;
  // unknown: (
  //   sessionStorageKey: string,
  //   certificationJson: CertificationJson
  // ) => void;
}

export { UseService };
