import { SessionService } from './util/session.service';
import { Component, NgZone, AfterViewInit } from '@angular/core';

@Component({
  selector: 'bom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'NEW BOM';

  constructor(private sessionService: SessionService, private ngZone: NgZone) { }

  ngAfterViewInit() {
    if (!this.sessionService.token()) {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 110,
        'height': 35,
        'longtitle': false,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
      });
    }
  }

  public onSignIn(googleUser) {
    this.ngZone.run(() => this.sessionService.registerGoogleUser(googleUser));
  };
}
