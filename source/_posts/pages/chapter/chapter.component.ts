import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BookService} from "../../service/book.service";
import {Chapter, ChapterDto} from "../../service/common/Type";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.less']
})
export class ChapterComponent implements OnInit {

  bookId:number
  chapterList:Chapter[]
  chapterD:ChapterDto
  constructor(private route: ActivatedRoute,private bookService:BookService) {
    this.route.params.subscribe( param => {
      this.bookId = param.id
      this.getChapter(param.id)

    });
  }

  ngOnInit(): void {

  }

  //得到章节信息
  getChapter(id:number){

    this.bookService.getChapter(id).subscribe(res=>{
      this.chapterList = res
    })
  }
  //得到详细章节信息
  getReadInfo(openId: number, bookId: number) {
    this.bookService.getReadInfo(openId, bookId).subscribe(res => {
    })
  }
  onLeftClick() {
    history.go(-1)
  }
  disabled: boolean = false;
  renderFooter: Function;

  renderHeader() {
    return '目录';
  }

  renderHeader1() {
    return 'Subtitle';
  }

  renderHeader2() {
    return 'Customized Right Side（Empty Content / Text / Image）';
  }

  renderHeader3() {
    return 'Align Vertical Center';
  }

  renderHeader4() {
    return 'Icon in the left';
  }

  renderHeader5() {
    return 'Text Wrapping';
  }

  renderHeader6() {
    return 'Other';
  }

  onClick() {
    console.log('click');
  }

  switchCheck(value) {
    console.log('switch status:', value);
  }

  onDisableClick() {
    console.log('click', this.disabled);
    this.disabled = true;
  }
}
