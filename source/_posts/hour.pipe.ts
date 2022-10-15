import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hourPipe'
})
//给分钟返回小时和分钟
export class HourPipe implements PipeTransform {

  transform(time: number): string {
    //如果时长大于60
    if (time > 60) {
      return Math.floor(time / 60) + '小时' + time % 60 + '分钟'
    } else {
      return time + '分钟'
    }
  }

}
