import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import {UserService} from "../../service/user.service";
import {Banner, Book, Notice, User} from "../../service/common/Type";
import {BookService} from "../../service/book.service";
import {StarBookService} from "../../service/star-book.service";
import {StateService} from "../../service/state.service";
import {BannerService} from "../../service/banner.service";
import {NoticeService} from "../../service/notice.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  token: string
  userInfo: User
  bookList: Book[]
  bookStarList: Book[]
  banner: Banner[]
  notice: string

  constructor(private activateInfo: ActivatedRoute,
              private router: Router,
              private cookie: CookieService,
              private userService: UserService,
              private bookService: BookService,
              private starBookService: StarBookService,
              public stateService: StateService,
              private bannerService: BannerService,
              private noticeService: NoticeService) {
  }

  high: string = ''

  ngOnInit(): void {
    //得到token 在得到token里获取用户信息
    this.getToken()
    //得到初始高度
    this.setInitHigh()
    //获得所有的书籍
    this.getAllBook()
    //得到通知
    this.getOneNotice()
  }

  tabbarStyle: object = {height: this.high};
  title = '茅院易起读书';
  hidden: boolean = false;
  fullScreen: boolean = false;
  topFlag: boolean = false;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  selectedIndex: number = 0;



  //得到通知
  getOneNotice() {
    this.noticeService.getOneNotice().subscribe(res => {
      if (this.notice == null) {
        this.notice = '暂无通知'
      }
      this.notice = res[0].content
    })
  }

  //得到token
  getToken() {
    this.activateInfo.queryParams.subscribe(queryParams => {
        this.token = queryParams.token
        //如果获取到的token为空，那么跳转到登陆页面
        if (this.token === null) {
          window.location.href = 'http://www.mtxympc.cn:8384'
        }
        this.cookie.set("token", this.token)
        //得到用户信息
        this.getUserInfo(this.token)
      }
    )
  }


  //获取用户信息
  getUserInfo(token: string) {
    this.userService.getUserInfo(token).subscribe(res => {

      this.userInfo = res
      this.cookie.set("openId", String(this.userInfo.openId))

      this.stateService.setUserInfo(this.userInfo)


      //得到用户收藏的书单
      this.getUserStar(this.userInfo.openId)
    })

  }

  //获得所有的book
  getAllBook() {
    this.bookService.getAllBook().subscribe(res => {
      this.bookList = res
    })
  }

  //得到收藏的书单
  getUserStar(openId: number) {
    this.starBookService.getUserStar(openId).subscribe(res => {

      this.bookStarList = res
    })
  }

  //设置初始宽高
  setInitHigh() {
    //初始高度赋值
    this.high = window.screen.height - 100 + 'px'
    this.tabbarStyle = {height: this.high};
  }

//===============================================

  //是否显示TabBar
  showTabBar(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.hidden = !this.hidden;
  }

  //显示下一个标签栏
  showNextTabBar(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const PANE_COUNT = 4;
    if (this.selectedIndex == PANE_COUNT - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  //显示全屏
  showFullScreen(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.fullScreen = !this.fullScreen;
    this.tabbarStyle = this.fullScreen
      ? {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
      }
      : {height: '400px'};
  }

  //改变位置
  changePosition(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.topFlag = !this.topFlag;
  }

  tabBarTabOnPress(pressParam: any) {

    this.selectedIndex = pressParam.index;
  }

}
