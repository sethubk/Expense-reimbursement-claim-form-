import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  constructor() { }
  
  
private details: any = {};
private entries:any=[];

  setDetails(data: any) {
    this.details = data;
  }

  getDetails() {
    return this.details;
  }
setentries(entries:any){
this.entries=entries
}
}
