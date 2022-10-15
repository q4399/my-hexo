import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  redirect:string
  constructor(private userService:UserService) {

  }

  ngOnInit(): void {
    this.userService.getRedirect().subscribe((res:{data:{redirect:string}})=>{
      this.redirect = res.data.redirect
      window.location.href = this.redirect
    })

  }

}
