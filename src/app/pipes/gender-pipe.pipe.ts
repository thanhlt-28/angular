import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {

  transform(value: Number): string {
    switch (value) {
      case 1:
        return "Nam"
        break;
      case 2: 
        return "Nữ"
      default:
        return "Khác"
        break;
    }
  }

}
