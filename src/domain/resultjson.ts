class resultjson{
  public user: user;
  public scroll: scroll;
  public start: start;
  public end: end;
  public click: Array<click>

  public constructor(user: user, scroll: scroll, start: start, end: end, click: Array<click>){
    this.user = user
    this.scroll = scroll
    this.start = start
    this.end = end
    this.click = click
  }
}

class user{
  public id: string
  public referrer: string
  public ua: string
  public url: string
  public constructor(id: string, referrer: string, url: string, ua: string){
    this.id = id
    this.referrer = referrer
    this.ua = ua
    this.url = url
  }
}

class scroll {
  public clientHeight: number
  public documentheight: number
  public scrollTop: number
  public constructor(clientHeight: number, documentheight: number, scrollTop: number){
    this.clientHeight = clientHeight
    this.documentheight = documentheight
    this.scrollTop = scrollTop
  }
}

class click {
  public x: number;
  public y: number;
  public constructor(x: number, y: number){
    this.x = x
    this.y = y
  }
}

class start {
  public clientheight: number
  public datetime: string
  public documentheight: number
  public scrollTop: number
  public constructor(clientheight: number, datetime: string, documentheight: number, scrollTop: number){
    this.clientheight = clientheight
    this.datetime = datetime
    this.documentheight = documentheight
    this.scrollTop = scrollTop
  }
}

class end {
  public datetime: string
  public documentheight: number
  public constructor(datetime: string, documentheight: number){
    this.datetime = datetime
    this.documentheight = documentheight
  }
}

export {resultjson,user,scroll,click,start,end}

