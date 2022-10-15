import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CommentDto, CommentInfo} from "./common/Type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  /**
   * 根据书籍id获取评论列表
   */
  getBookComment(bookId:number):Observable<CommentInfo[]>{
    return  this.http.get(this.uri+"getCommentsByBookId/"+bookId).pipe(map(
      (res:{data:{comments:CommentInfo[]}})=>res.data.comments
    ))
  }
  setComment(comment:CommentDto):Observable<any>{
    return  this.http.post(this.uri+"addComment",comment).pipe(map(
      (res)=>res
    ))
  }
}
