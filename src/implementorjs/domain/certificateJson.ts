declare let __atinfo: AccessJson;

class AccessJson {
  // accesskey
  public Ay: string;

  // siteid
  public Sd: string;

  public constructor(Ay: string, Sd: string){
    this.Ay = Ay
    this.Sd = Sd
  }
}

class CertificationJson {
  // siteid
  public SD: string
  // Baseurl(dataly)
  public BL:Baseurl
  // Optionurl(dataly以外のサービス)
  public OL:Array<Optionurl>
}

class Baseurl {
  // サービス名
  public SE: string
  // タグ情報
	public TG: string
}

class Optionurl {
  // サービス名
  public SE: string
  // タグ情報
	public TG: string
}