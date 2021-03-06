import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SessionService {

  onUserChange = new EventEmitter();

  constructor() { }

  registerGoogleUser(user: any) {
    const profile = user.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // this.googleUser = user;
    window.localStorage['token'] = profile.getId();
    this.onUserChange.emit(window.localStorage['token']);
  }

  token() {
    return window.localStorage['token'];
  }

}
