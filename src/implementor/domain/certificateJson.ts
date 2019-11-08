// declare let __atinfo: AccessJson;

class AccessJson {
  // accesskey
  public Ay: string;

  // siteid
  public Sd: string;

  public constructor(Ay: string, Sd: string) {
    this.Ay = Ay;
    this.Sd = Sd;
  }
}

class CertificationJson {
  // siteid
  public SD: string;
  // Baseurl(dataly)
  public BL: Baseurl;
  // Optionurl(dataly以外のサービス)
  public OL: Optionurl[];

  public constructor(SD: string, BL: Baseurl, OL: Optionurl[]) {
    this.SD = SD;
    this.BL = BL;
    this.OL = OL;
  }
}

class Baseurl {
  // サービス名
  public SE: string;
  // タグ情報
  public TG: string;

  public constructor(SE: string, TG: string) {
    this.SE = SE;
    this.TG = TG;
  }
}

class Optionurl {
  // サービス名
  public SE: string;
  // タグ情報
  public TG: string;

  public constructor(SE: string, TG: string) {
    this.SE = SE;
    this.TG = TG;
  }
}

export { Baseurl, Optionurl, CertificationJson, AccessJson };
