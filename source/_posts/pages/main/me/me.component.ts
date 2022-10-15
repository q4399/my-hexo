import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../service/common/Type";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.less']
})
export class MeComponent implements OnInit {

  disabled: boolean = false;
  renderFooter: Function;
  @Input()
  userInfo:User
  constructor() { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }
  thumbStyle = {
    width: '60px',
    height: '60px',
    'border-radius':'30px'
  };

  renderHeader() {
    return 'Basic Style';
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
