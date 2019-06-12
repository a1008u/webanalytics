declare let __atinfo: AccessJson;

class AccessJson {
  public atkey: string;
  public siteids: Array<string>;

  public constructor(atkey: string, siteids: Array<string>){
    this.atkey = atkey
    this.siteids = siteids
  }
}

class CertificationJson {
  public ACCESSKEY: string
  public SITEID: string
  public BASEURL:Baseurl
}

class Baseurl {
  public SERVICENAME: string
	public TAG: string
}