import { CertificationJson } from "./certificateJson";

interface UseService {
    DatAly:(sessionStorageKey: string, certificationJson: CertificationJson) => void
    unknown:(sessionStorageKey: string, certificationJson: CertificationJson) => void
  }

export {UseService}