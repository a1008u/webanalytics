import { CertificationJson } from "./certificateJson";

interface UseService {
    Dataly:(sessionStorageKey: string, certificationJson: CertificationJson) => void
    unknown:(sessionStorageKey: string, certificationJson: CertificationJson) => void
  }

export {UseService}