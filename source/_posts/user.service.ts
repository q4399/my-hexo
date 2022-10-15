import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {FontAndBackDto, FontSizeDto, User} from "./common/Type";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              @Inject(API_CONFIG) private uri: string,
              private cookie:CookieService) {

  }
  /**
   * 获取用户信息
   * @param token
   */
  getUserInfo(token:string):Observable<User>{
    return  this.http.get(this.uri+"getInfo/"+this.cookie.get("token")).
    pipe(map(
      (res:{data:{user:User}})=>res.data.user
    ))
  }

  /**
   * 得到重定向地址
   */
  getRedirect(){
    return this.http.get(this.uri+"login").pipe(map((res)=>res))
  }

  /**
   * 改变字体颜色
   */
  changeFontAndBack(dto:FontAndBackDto):Observable<any>{
    return this.http.post(this.uri+"changeFontAndBack",dto).pipe(map(
      (res)=>res
    ))
  }

  /**
   * 改变字体大小
   */
  changeFontSize(dto:FontSizeDto):Observable<any>{
    return this.http.post(this.uri+"changeFontSize",dto).pipe(map(
      (res)=>res
    ))
  }
}
