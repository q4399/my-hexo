import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {Feedback, httpOptions} from "./common/Type";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
//用户反馈
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }


  getUserFeedback(feedback:Feedback):Observable<any>{

    return this.http.post(this.uri+"feedback",feedback).pipe(map(
      (res)=>res
    ))
  }
}
