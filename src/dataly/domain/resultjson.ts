class Resultjson {
  // user情報
  public ur: UR;
  // partner情報
  public pr: PR;
  // sl情報
  public sl: SL;
  // start情報（ページ読込時のjs取得情報）
  public st: ST;
  // end情報（ページ離脱時のjs取得情報）
  public ed: ED;
  // DatAlySend情報
  public sd:SD;

  public constructor(ur: UR, pr: PR, sl: SL, st: ST, ed: ED, sd:SD) {
    this.ur = ur;
    this.pr = pr;
    this.sl = sl;
    this.st = st;
    this.ed = ed;
    this.sd = sd;
  }
}

/**
 * partner情報用クラス
 */
class PR {
  // siteid情報
  public sd: string;
  // title情報
  public ti: string;
  public constructor(sd: string, ti: string) {
    this.sd = sd;
    this.ti = ti;
  }
}

/**
 * user情報用のクラス
 */
class UR {
  // id情報（アトリビューション分析用）
  public ad: string;
  // id情報（CV用）
  public cd: string;
  // サイト内に存在するアクトレ広告またはatudの番号
  public ao: number;
  // referrer情報
  public rr: string;
  // useragent情報
  public ua: string;
  // url情報
  public url: string;
  // ipアドレス情報
  public ip: string;
  // timezoneのzone(momentjs利用)
  public zn: string;
  // クリックしたアンカータグ
  public ac: string;
  // クリックしたimg
  public ar: string;
  public constructor(
    ad: string,
    cd: string,
    ao: number,
    rr: string,
    url: string,
    ua: string,
    ip: string,
    zn: string,
    ac: string,
    ar: string
  ) {
    this.ad = ad;
    this.cd = cd;
    this.ao = ao;
    this.rr = rr;
    this.url = url;
    this.ua = ua;
    this.ip = ip;
    this.zn = zn;
    this.ac = ac;
    this.ar = ar;
  }
}

/**
 * scroll情報用のクラス
 */
class SL {
  // clientHeight情報
  public ct: number;
  // documentheight情報
  public dt: number;
  // scrollTop情報
  public sp: number;
  public constructor(ct: number, dt: number, sp: number) {
    this.ct = ct;
    this.dt = dt;
    this.sp = sp;
  }
}

/**
 * click情報用のクラス
 */
class CK {
  // x座標情報
  public x: number;
  // y座標情報
  public y: number;
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

/**
 * start情報用のクラス
 */
class ST {
  // clientheight情報
  public ct: number;
  // datetime情報(local)
  public dl: string;
  // datetime情報(utc)
  public dc: string;
  // datetime情報(JST)
  public dj: string;
  // documentheight情報
  public dt: number;
  // slTop情報
  public sp: number;
  public constructor(
    ct: number,
    dl: string,
    dc: string,
    dj: string,
    dt: number,
    sp: number
  ) {
    this.ct = ct;
    this.dl = dl;
    this.dc = dc;
    this.dj = dj;
    this.dt = dt;
    this.sp = sp;
  }
}

/**
 * end情報用のクラス
 */
class ED {
  // datetime情報(local)
  public dl: string;
  // datetime情報(utc)
  public dc: string;
  // datetime情報(JST)
  public dj: string;
  // documentheight情報
  public dt: number;
  public constructor(dl: string, dc: string, dj: string, dt: number) {
    this.dl = dl;
    this.dc = dc;
    this.dj = dj;
    this.dt = dt;
  }
}

// send data情報
class SD {
  // send trigger情報(impression, click)
  public tr: string;
  public constructor(tr:string){
    this.tr = tr;
  }
}

export {
  Resultjson as resultjson,
  UR as ur,
  PR as pr,
  SL as sl,
  CK as ck,
  ST as st,
  ED as ed,
  SD as sd
};
