import {HttpHeaders} from "@angular/common/http";

export type Book = {
  bookId: number,
  author: string,
  bookIntro: string,
  bookName: string,
  time: string,
  image: string
}
export type User = {
  openId: number,
  nickName: string,
  name: string,
  headimgurl: string,
  starBook: string,
  todayMinutes: number,
  totalMinutes: number,
  textSize: number,
  backcolor: string,
  fontcolor: string,
}
export type Banner = {
  id: number,
  img: string
}

export type ChapterDto = {
  id: number,
  bookId: number
}
export type CommentInfo = {
  id:number,
  openId:number,
  bookId:number,
  comment:string,
  nickName:string,
  headimgurl:string,
  createTime:string
}
export type CommentDto = {
  openId:number,
  bookId:number,
  comment:string
}
export type UserReadVo = {
  id:number,
  openId:number,
  bookId:number,
  chapter:number,
  allChapter:number,
  current:number,
  include:string,
  todayTime:number,
  totalTime:number
}
export type Chapter = {
  id: number,
  bookId: number,
  chapter: number,
  chapterName: string,
  include:string
}

export type UserReadLog = {
  id:number,
  openId:number,
  todayRead:number,
  totalRead:number,
  todayTime:number
}
export type Feedback = {
  openId:number,
  content:string
}

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};
export type Notice = {
  id:number,
  content:string
}
export type Color = {
  id:number,
  back:string,
  font:string,
  name:string,
  isShow:boolean
}
//改变字体的颜色
export type FontAndBackDto = {
  openId:number,
  backcolor:string,
  fontcolor:string
}
//改变字体的大小
export type FontSizeDto = {
  openId:number,
  fontsize:number
}
