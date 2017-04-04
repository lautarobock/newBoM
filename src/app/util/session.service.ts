import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private googleUser: any = null;

  constructor() { }

  registerGoogleUser(user:any) {
    let profile = user.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    this.googleUser = user;
  }

  googleUserId() {
    return this.googleUser.getBasicProfile().getId();
  }

}
