import { Injectable } from '@angular/core';

@Injectable()
export class PassService {
  data;
  constructor() { }
  set(res)
  {
    this.data=res;
    console.log(this.data+"Set")
  }
  get()
  {
    console.log(this.data+"SEND")
    return this.data
  }
}
