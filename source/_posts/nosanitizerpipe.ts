import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

//正确解析字符串
@Pipe({ name: 'noSanitize' })

export class NoSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) { }

  transform(html: string): SafeHtml {

    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
