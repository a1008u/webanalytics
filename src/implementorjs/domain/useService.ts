import { CertificationJson } from "./certificateJson";

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
