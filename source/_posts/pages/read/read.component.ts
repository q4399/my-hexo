import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {Chapter, Color, FontAndBackDto, FontSizeDto, User, UserReadVo} from "../../service/common/Type";
import {UserService} from "../../service/user.service";
import {ModalService,  ToastService} from "ng-zorro-antd-mobile";
import {interval} from "rxjs";

//图书的颜色
const color: Color[] = [
  {
    id: 0,
    back: '#2f2f2f',
    font: '#ffffff',
    name: '夜间模式',
    isShow: false
  },
  {
    id:1,
    back: '#ecd9ac',
    font: '#3d3d3d',
    name: '沉浸模式',
    isShow: false
  },
  {
    id: 2,
    back: '#97cf94',
    font: '#000000',
    name: '护眼模式',
    isShow: false
  },
  {
    id: 3,
    back: '#e6e6e6',
    font: '#000000',
    name: '浅色模式',
    isShow: false
  }
]

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.less']
})
export class ReadComponent implements OnInit, OnDestroy {
  //配色列表
  colorList: Color[] = color
  //改变的颜色
  fontAndBackDto: FontAndBackDto
  fontsizeDto: FontSizeDto
  readInfo: UserReadVo
  bookId: number
  startTime: number = 0
  endTime: number = 0
  //阅读时长
  readTime: number = 0


  isShow: boolean = false
  userInfo: User
  chapterList: Chapter[]
  chapterName: string
  height: number = document.documentElement.clientHeight;
  state = {
    open: false
  };
  //控制页面的文字和背景
  colorAndBack = {
    background: '#B5E6B5',
    fontSize: '20px',
    color: '#000000'
  }
  //轮询任务
  time$:any

  constructor(private bookService: BookService,
              private cookie: CookieService,
              private route: ActivatedRoute,
              private userService: UserService,
              private _modal: ModalService,
              private _toast: ToastService) {
    this.route.params.subscribe(param => {
      this.bookId = param.id

    });

    this.getUserInfo()

    //获取所有章节
    this.getChapter(this.bookId)
    this.getReadInfo(Number(this.cookie.get("openId")), this.bookId)

  }


  //改变背景颜色
  showAlertMuchButtons(message) {
    this._modal.alert('调节颜色', message, [
      {
        text: '夜间模式', onPress: () => {
          //0
          this.onChange(0)
        }
      },
      {
        text: '沉浸模式', onPress: () => {
          //1
          this.onChange(1)
        }
      },
      {
        text: '护眼模式', onPress: () => {
          //2
          this.onChange(2)
        }
      },
      {
        text: '浅色模式', onPress: () => {
          //3
          this.onChange(3)
        }
      },
      {text: '取消', onPress: () => console.log('取消')}
    ]);
  }


  //轮询查看用户是否在线
  listen() {
    //1分钟
    this.time$ = interval(60000)
      .pipe()
      .subscribe(
        (res: any) => {
          //监听用户是否在当前页面 在的话为false,
          //没有离开页面
          if (!document.hidden){
            console.log("在当前页面")
            //得到结束时间
            this.endTime = (new Date()).valueOf();
            //把阅读时间累加
            this.readTime = this.endTime - this.startTime
            this.pushTime()
            //重置开始时间
            this.startTime = (new Date()).valueOf()
          }else {
            console.log("不在当前页面")
            //重置开始时间
            this.startTime = (new Date()).valueOf()
          }
        }
      )
  }

  //改变字体颜色
  onChange(id) {
    this.fontAndBackDto = {
      openId: this.userInfo.openId,
      backcolor: this.colorList[id].back,
      fontcolor: this.colorList[id].font
    }
    //改变字体颜色
    this.userService.changeFontAndBack(this.fontAndBackDto).subscribe(res => {
      this.colorAndBack = {
        background: this.colorList[id].back,
        fontSize: this.userInfo.textSize + 'px',
        color: this.colorList[id].font
      }
    })
  }


  changeShow() {
    this.isShow = !this.isShow
  }

  ngOnDestroy(): void {
    //关闭轮询任务，取消订阅
    this.time$.unsubscribe()
    // this.pushTime()
    console.log("destroy")
  }

  ngOnInit(): void {
    //调用调度器
    this.listen()
    this.startTime = (new Date()).valueOf();
  }

  //下一章
  upChapter(chapterId: number) {
    //得到id，调用getChapterById
    //下一章，只要找到当前的章节，就可以得到下一章的信息
    for (let i = 0; i < this.chapterList.length; i++) {
      if (chapterId === this.chapterList[i].chapter) {

        this.getChapterByIdOther(this.chapterList[i + 1].id)
      }
    }
    //维护页头
    document.getElementById("top").scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth'
    })

  }

  //上一章
  downChapter(chapterId: number) {

    //得到id，调用getChapterByIdOther
    //下一章，只要找到当前的章节，就可以得到下一章的信息
    for (let i = 0; i < this.chapterList.length; i++) {
      if (chapterId === this.chapterList[i].chapter) {

        this.getChapterByIdOther(this.chapterList[i - 1].id)
      }

    }
    //维护页头
    document.getElementById("top").scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth'
    })

  }

  //控制字体大小
  fontsize(flag: boolean) {
    //大
    if (flag) {
      this.fontsizeDto = {
        openId: this.userInfo.openId,
        fontsize: this.userInfo.textSize + 1
      }
      this.userService.changeFontSize(this.fontsizeDto).subscribe(res => {
        this.getUserInfo()
      })
    } else {
      this.fontsizeDto = {
        openId: this.userInfo.openId,
        fontsize: this.userInfo.textSize - 1
      }
      this.userService.changeFontSize(this.fontsizeDto).subscribe(res => {
        this.getUserInfo()
      })
    }
  }

  locale = {
    prevText: '上一章',
    nextText: '下一章'
  };

  onLeftClick() {
    history.go(-1)
  }

  onchange($event) {
    console.log(this.readInfo)
    console.log($event)
  }

  onOpenChange(event) {

    this.state.open = !this.state.open;

  }

  comeBack() {
    history.go(-1)
  }

  onClick() {
    console.log('click');

  }

  //发送读书时长
  pushTime() {

    console.log("已执行")
    //如果时长小于0，那么就让他为0
    if (this.readTime < 0) {
      this.readTime = 0
    }
    this.bookService.getTime(this.readInfo.openId, this.readTime, this.readInfo.bookId).subscribe(res => {
    })
  }

  //得到具体章节的id
  getChapterById(chapterId: number) {
    for (let i = 0; i < this.chapterList.length; i++) {
      if (this.chapterList[i].id === chapterId) {
        this.chapterName = this.chapterList[i].chapterName
      }
    }
    this.bookService.getChapterInfo(this.bookId, chapterId, this.readInfo.openId).subscribe(
      (res) => {

        this.readInfo = res
        this.onOpenChange(event)
      }
    )
    //维护页头
    document.getElementById("top").scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth'
    })

  }

//得到具体章节的id
  getChapterByIdOther(chapterId: number) {
    for (let i = 0; i < this.chapterList.length; i++) {
      if (this.chapterList[i].id === chapterId) {
        this.chapterName = this.chapterList[i].chapterName
      }
    }
    this.bookService.getChapterInfo(this.bookId, chapterId, this.readInfo.openId).subscribe(
      (res) => {

        this.readInfo = res
      }
    )
  }


  //得到章节信息
  getReadInfo(openId: number, bookId: number) {

    this.bookService.getReadInfo(openId, bookId).subscribe(res => {
      this.readInfo = res
      //得到id，调用getChapterByIdOther
      //下一章，只要找到当前的章节，就可以得到下一章的信息
      for (let i = 0; i < this.chapterList.length; i++) {
        if (this.readInfo.chapter === this.chapterList[i].chapter) {

          this.getChapterByIdOther(this.chapterList[i].id)
        }

      }
    })

  }

  //得到用户信息
  getUserInfo() {
    this.userService.getUserInfo(this.cookie.get("token")).subscribe(res => {
      this.userInfo = res

      for (let i = 0; i < this.colorList.length; i++) {
        if (this.colorList[i].back === this.userInfo.backcolor) {
          this.colorList[i].isShow = true
          this.colorAndBack = {
            background: this.userInfo.backcolor,
            fontSize: this.userInfo.textSize + 'px',
            color: this.userInfo.fontcolor
          }
        }
      }

    })
  }

  //得到章节信息
  getChapter(id: number) {
    this.bookService.getChapter(id).subscribe(res => {
      this.chapterList = res
    })
  }
}
