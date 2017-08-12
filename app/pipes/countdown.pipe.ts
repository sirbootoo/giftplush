import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'countdown',
    pure: false
})

export class CountdownPipe implements PipeTransform {
  transform(text: string, args: number) {
    if(text != undefined){
      let maxLength = args || 0;
      let length = text.length;

      return (maxLength - length);
    } else {
      
      return args;
    }
  }
}