import { SessionService } from '../util/session.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesService {

  private static readonly BASE_URL = 'https://brew-o-matic.useast.appfog.ctl.io';

  constructor(private http: Http, private sessionService: SessionService) { }

  myRecipes(limit: number = 25, skip: number = 0, sort: string = '-code') {
    return this.http.get(`${RecipesService.BASE_URL}/recipe` +
      `?google_id=${this.sessionService.token()}` +
      `&limit=${limit}` +
      `&skip=${skip}` +
      `&sort=${sort}`).map(res => res.json());
  }

  get(id: string) {
    return this.http.get(`${RecipesService.BASE_URL}/recipe/${id}?google_id=${this.sessionService.token()}`)
      .map(res => res.json());
  }
}
