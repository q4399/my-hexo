import { Component, OnInit } from '@angular/core';
import {Feedback, User} from "../../service/common/Type";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../service/user.service";
import {FeedbackService} from "../../service/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.less']
})
export class FeedbackComponent implements OnInit {
  userInfo: User
  openId:number = 0
  value:string
  feedback:Feedback
  //反馈成功
  success:string
  constructor(private cookie:CookieService,
              private userService:UserService,
              private feedbackService:FeedbackService) { }

  ngOnInit(): void {
    this.getToken()
  }

  //提交用户的反馈
  submit(openId:number,value:string){
    if (value === undefined) {
      this.value = '反馈不能为空！'
      return
    }
    this.feedback = {
      openId:openId,
      content:value
    }
    this.feedbackService.getUserFeedback(this.feedback).subscribe(res=>{
        this.success = '提交成功 ，感谢反馈 !'
    })
  }
  //得到token
  getToken() {
    //得到用户信息
    this.getUserInfo(this.cookie.get("token"))
  }


  //获取用户信息
  getUserInfo(token: string) {
    this.userService.getUserInfo(token).subscribe(res => {
      this.userInfo = res
      this.openId = res.openId

    })

  }
  onLeftClick(){
    history.go(-1)
  }

}
