import {Component, Input, OnInit} from '@angular/core';
import {Banner, Book, Notice} from "../../../service/common/Type";
import {BookService} from "../../../service/book.service";
import {BannerService} from "../../../service/banner.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  bookSearch:string
  @Input()
  bookList: Book[]

  bannerList:Banner[]
  @Input()
  notice: string
  state = {
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: '184px'
  };
  value: string = '';
  thumbStyle = {
    width: '42.66px',
    height: '64px'
  };

  constructor(private bookService:BookService,private bannerService:BannerService) {
    this.getAllBanner()
  }

  ngOnInit(): void {
  }
  onClick() {
    console.log('1');
  }

  getAllBanner() {
    this.bannerService.getAllBanner().subscribe(res => {
      this.bannerList = res
      for (let i = 0; i < this.bannerList.length; i++) {
        this.state.data[i] = this.bannerList[i].img
      }
    })
  }

  beforeChange(event) {
    console.log('slide ' + event.from + ' to ' + event.to);
  }

  afterChange(event) {
    console.log('slide to ' + event);
  }


  autoFocus = {
    focusValue: true
  };
  focusObj = {
    focusValue: false,
    date: new Date()
  };

  //
  change($event: string) {
    this.bookService.queryBook($event).subscribe(res=>{
      this.bookList = res
    })
  }

  //搜索框提交
  submit(value: string) {
    console.log(value);

  }

  clear(value: any) {
    console.log(value, 'onClear');
  }

  focus() {
    console.log('onFocus');
  }

  blur() {
    console.log('onBlur');
  }

  cancel() {
    console.log('onCancel');
  }

  handleClick() {
    this.focusObj = {
      focusValue: true,
      date: new Date()
    };
  }

}
