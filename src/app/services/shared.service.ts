import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  user: User;
  tokens: string;
  showTemplate = new EventEmitter();

  constructor() { 
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }

    return this.instance;
  }

  isLoggedIn(){
    if(this.user == null){
      return false;
    }

    return this.user.email != '';
  }
}
