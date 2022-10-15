import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {CookieService} from "ngx-cookie-service";
import {User, UserReadLog} from "../../service/common/Type";
import {UserReadLogService} from "../../service/user-read-log.service";

@Component({
  selector: 'app-readinformation',
  templateUrl: './readinformation.component.html',
  styleUrls: ['./readinformation.component.less']
})
export class ReadinformationComponent implements OnInit {

  userId:number
  userInfo:User
  userReadLog:UserReadLog[]
  //今天日期
  today:string
  constructor(private route: ActivatedRoute,private userService:UserService,
              private cookie:CookieService,
              private userReadLogService:UserReadLogService) {
    this.route.params.subscribe( param => {
      this.userId = param.id
      this.userService.getUserInfo(this.cookie.get("token")).subscribe(res=>{
        this.userInfo = res
        this.today = new Date(new Date()).toLocaleDateString()
        //得到日志消息
        this.getReadLog(this.userInfo.openId)
      })
    });
  }

  ngOnInit(): void {
  }
  onLeftClick() {
    console.log("i am come back")
    history.go(-1)
  }
  thumbStyle = {
    width: '60px',
    height: '60px',
    'border-radius':'30px'
  };
  getReadLog(openId:number){
    this.userReadLogService.getReadingLog(openId).subscribe(res=>{
      this.userReadLog = res
    })
  }
}
