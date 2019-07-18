class resultjson{
  // user情報
  public ur: ur;
  // partner情報
  public pr: pr;
  // sl情報
  public sl: sl;
  // start情報（ページ読込時のjs取得情報）
  public st: st;
  // end情報（ページ離脱時のjs取得情報）
  public ed: ed;
  // click情報
  public ck: Array<ck>

  public constructor(ur: ur, pr:pr, sl: sl, st: st, ed: ed, ck: Array<ck>){
    this.ur = ur
    this.pr = pr
    this.sl = sl
    this.st = st
    this.ed = ed
    this.ck = ck
  }
}

/**
 * partner情報用クラス
 */
class pr{
  // siteid情報
  public sd: string;
  // title情報
  public ti: string;
  public constructor(sd: string, ti: string){
    this.sd = sd;
    this.ti = ti;
  }
}

/**
 * user情報用のクラス
 */
class ur{
  // id情報
  public id: string
  // referrer情報
  public rr: string
  // useragent情報
  public ua: string
  // url情報
  public url: string
  public constructor(id: string, rr: string, url: string, ua: string){
    this.id = id
    this.rr = rr
    this.url = url
    this.ua = ua
  }
}

/**
 * scroll情報用のクラス
 */
class sl {
  // clientHeight情報
  public ct: number
  // documentheight情報
  public dt: number
  // scrollTop情報
  public sp: number
  public constructor(ct: number, dt: number, sp: number){
    this.ct = ct
    this.dt = dt
    this.sp = sp
  }
}

/**
 * click情報用のクラス
 */
class ck {
  // x座標情報
  public x: number;
  // y座標情報
  public y: number;
  public constructor(x: number, y: number){
    this.x = x
    this.y = y
  }
}

/**
 * start情報用のクラス
 */
class st {
  // clientheight情報
  public ct: number
  // datetime情報
  public de: string
  // documentheight情報
  public dt: number
  // slTop情報
  public sp: number
  public constructor(ct: number, de: string, dt: number, sp: number){
    this.ct = ct
    this.de = de
    this.dt = dt
    this.sp = sp
  }
}

/**
 * end情報用のクラス
 */
class ed {
  // datetime情報
  public de: string
  // documentheight情報
  public dt: number
  public constructor(de: string, dt: number){
    this.de = de
    this.dt = dt
  }
}

export {resultjson,ur,pr,sl,ck,st,ed}

