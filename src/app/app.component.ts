import { SessionService } from './util/session.service';
import { StreamController } from '@angular/service-worker/worker';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NEW BOM';

  constructor(private sessionService: SessionService) {}

  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 110,
        'height': 35,
        'longtitle': false,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    this.sessionService.registerGoogleUser(googleUser);
};
}
