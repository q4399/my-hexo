import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {Observable} from "rxjs";
import {Book, Chapter, httpOptions, UserReadVo} from "./common/Type";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) {

  }

  /**
   * 获取所有书籍
   */
  getAllBook(): Observable<Book[]> {
    return this.http.get(this.uri + "getAllBook").pipe(map(
      (res: { data: { book: Book[] } }) => res.data.book
    ))
  }

  /**
   * 根据书籍id获取章节信息
   */
  getChapter(bookId: number): Observable<Chapter[]> {
    return this.http.get(this.uri + "getAllChapter/" + bookId).pipe(map(
      (res: { data: { chapter: Chapter[] } }) => res.data.chapter
    ))
  }

  /**
   * 根据书籍id获取书籍信息
   */
  getBook(bookId: number): Observable<Book> {
    return this.http.get(this.uri + "getBook/" + bookId).pipe(map(
      (res: { data: { book: Book } }) => res.data.book
    ))
  }
  //获取用户阅读情况
  getUserBook(bookId:number,openId:number):Observable<UserReadVo>{
    return this.http.get(this.uri + "getUserBook/" + bookId+"/"+openId).pipe(map(
      (res: { data: { userInfo: UserReadVo } }) => res.data.userInfo
    ))
  }

  /**
   * 根据书籍和章节id获取章节内容
   */
  getChapterInfo(bookId:number,chapterId:number,openId:number): Observable<UserReadVo> {
    return this.http.get(this.uri + "getChapter/"+bookId+"/"+chapterId+"/"+openId).pipe(map(
      (res:{data:{chapter:UserReadVo}})=>res.data.chapter
    ))
  }

  /**
   * 根据用户id和bookId获取阅读进度
   */
  getReadInfo(openId:number,bookId:number):Observable<UserReadVo>{
    return this.http.get(this.uri + "getReadInfo/" + openId+"/"+bookId).pipe(map(
      (res: { data: { userRead: UserReadVo } }) => res.data.userRead
    ))
  }

  /**
   * 得到阅读时长(发送)
   */
  getTime(openId:number,readTime:number,bookId:number){
      return this.http.get(this.uri + "pushTime/" + openId+"/"+readTime+"/"+bookId).pipe(map(
        (res) => res
      ))
  }

  /**
   * 获取上一章节或者下一章节
   */
  getOtherChapter(openId:number,bookId:number,chapter:number,upOrDown:number):Observable<UserReadVo>{
    return this.http.get(this.uri+"getOtherChapter/"+openId+"/"+bookId+"/"+chapter+"/"+upOrDown).pipe(map(
      (res:{data:{chapter:UserReadVo}})=>res.data.chapter
    ))
  }

  /**
   * 模糊查询书籍
   */
  queryBook(bookName:string):Observable<Book[]>{
    return this.http.post(this.uri+"getBookByName",bookName,httpOptions).pipe(map(
      (res:{data:{list:Book[]}})=>res.data.list
    ))
  }
}
