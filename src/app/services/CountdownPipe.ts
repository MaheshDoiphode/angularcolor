import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countdown' })
export class CountdownPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60000);
    let seconds: string = ((value % 60000) / 1000).toFixed(0);
    seconds = seconds.length < 2 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }
}
