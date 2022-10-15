import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.less']
})
export class AboutmeComponent implements OnInit {

  width
  constructor() {
    this.width = document.body.clientWidth
  }

  ngOnInit(): void {
  }
  onLeftClick() {
    history.go(-1)
  }

}
