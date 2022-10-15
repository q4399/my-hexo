import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {Book, CommentDto, CommentInfo, User, UserReadVo} from "../../service/common/Type";
import {CommentService} from "../../service/comment.service";
import {UserService} from "../../service/user.service";
import {CookieService} from "ngx-cookie-service";
import {StarBookService} from "../../service/star-book.service";
import {StateService} from "../../service/state.service";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.less']
})
export class BookInfoComponent implements OnInit {
  bookId: number
  bookInfo: Book
  userInfo: User
  token: string
  value: string = ''
  readInfo: UserReadVo = {
    id: 0,
    openId: 0,
    bookId: 0,
    chapter: 0,
    allChapter: 0,
    current: 0,
    include: '0',
    todayTime: 0,
    totalTime: 0
  }
  commentList: CommentInfo[]
  isStar: boolean = false
  comment: CommentDto

  constructor(private activateInfo: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private commentService: CommentService,
              private userService: UserService,
              private cookie: CookieService,
              private starBookService: StarBookService,
              private stateService: StateService) {

  }

  ngOnInit(): void {
    //从路由获取书籍id
    this.activateInfo.params.subscribe(param => {
      this.bookId = param.id
      //得到书籍信息
      this.getBookInfo(this.bookId)
      //得到评论信息
      this.getComment(this.bookId)
    });
    this.getToken()
  }

  //判断是否被收藏
  isStarBook(openId: number, bookId: number) {
    this.starBookService.isSarBook(openId, bookId).subscribe(res => {
      this.isStar = res
    })
  }

  //收藏图书
  star() {
    this.starBookService.starOrUnstarBook(this.userInfo.openId, this.bookInfo.bookId).subscribe(res => {
      this.isStar = !this.isStar
    })
  }

  thumbStyle = {
    width: '150px',
    height: '200px'
  };
  thumbStyleForComment = {
    width: '60px',
    height: '60px',
    'border-radius': '30px'
  }

  onLeftClick() {
    history.go(-1)
  }

  //提交评论
  submit(openId: number, value: string, bookId: number) {
    //非空校验
    if (value.length === 0) {
      return
    }
    this.comment = {
      openId: openId,
      bookId: bookId,
      comment: value
    }
    this.commentService.setComment(this.comment).subscribe(res => {
      this.getComment(bookId)
      this.value = ''
    })
  }

  //得到书籍信息
  getBookInfo(id: number) {
    this.bookService.getBook(id).subscribe(res => {
      this.bookInfo = res
    })
  }

  //获取用户阅读情况
  getUserBook(bookId: number, openId: number) {
    this.bookService.getUserBook(bookId, openId).subscribe(res => {
      this.readInfo = res

    })
  }

  //得到评论信息
  getComment(bookId: number) {
    this.commentService.getBookComment(bookId).subscribe(res => {
      this.commentList = res
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
      this.cookie.set("openId", String(this.userInfo.openId))
      //判断书籍是否被标星
      this.isStarBook(this.userInfo.openId, this.bookId)
      //获取用户阅读情况
      this.getUserBook(this.bookId, this.userInfo.openId)
      this.stateService.setUserInfo(this.userInfo)

    })

  }

  onClick() {

  }


  error;
  readonlyValue =
    'This is a very very very very very very very very' +
    ' very very very very very very very very very very long paragraph of read-only text';
  numberFocus = {
    focus: false,
    date: new Date()
  };
  inputFocus = {
    focus: false,
    date: new Date()
  };

  titleFocus = {
    focus: false,
    date: new Date()
  };
  autoFocus = {focus: true, date: new Date()};


  clickFocus() {
    this.numberFocus = {
      focus: true,
      date: new Date()
    };
  }

  clickFocusInput() {
    this.inputFocus = {
      focus: true,
      date: new Date()
    };
  }
}
