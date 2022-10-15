import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {Observable} from "rxjs";
import {Banner} from "./common/Type";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) {
  }

  /**
   * 获取所有轮播图
   */
  getAllBanner(): Observable<Banner[]> {
    return this.http.get(this.uri + "getAllBanner").pipe(map(
      (res:{data:{banner:Banner[]}})=>res.data.banner
    ))
  }
}
