import {Component, Input, OnInit} from '@angular/core';
import {Book, User, UserReadVo} from "../../../service/common/Type";

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.less']
})
export class BookstoreComponent implements OnInit {
  @Input()
  userInfo: User
  //得到收藏的书单
  @Input()
  bookStarList:Book[]

  constructor() {
  }
  ngOnInit(): void {
  }

  thumbStyle = {
    width: '42.66px',
    height: '64px'
  };
}
