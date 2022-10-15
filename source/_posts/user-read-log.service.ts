import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {UserReadLog} from "./common/Type";

@Injectable({
  providedIn: 'root'
})
export class UserReadLogService {

  constructor(private http: HttpClient,
              @Inject(API_CONFIG) private uri: string,
              private cookie:CookieService) { }

  //得到以前的阅读时长
  getReadingLog(openId:number):Observable<UserReadLog[]>{
    return  this.http.get(this.uri+"getReadingLog/"+openId).pipe(map(
      (res:{data:{list:UserReadLog[]}})=>res.data.list
    ))
  }
}
