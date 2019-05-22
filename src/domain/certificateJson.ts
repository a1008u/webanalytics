declare let __atinfo: AccessJson;

class AccessJson {
  public atkey: string;
  public siteids: Array<string>;

  public constructor(atkey: string, siteids: Array<string>){
    this.atkey = atkey
    this.siteids = siteids
  }
}