import { RecipeViewRouteDecorator } from './view/recipes/recipe-view/recipe-view.component';
import 'hammerjs';
import { AppComponent } from './app.component';
import { UtilModule } from './util/util.module';
import { RecipesListComponent } from './view/recipes/recipes-list/recipes-list.component';
import { ViewModule } from './view/view.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'rxjs/add/operator/switchMap';

const appRoutes: Routes = [
  { path: 'recipe/:id', component: RecipeViewRouteDecorator },
  { path: 'recipe',      component: RecipesListComponent },
  { path: '',
    redirectTo: '/recipe',
    pathMatch: 'full'
  },
  { path: '**', component: RecipesListComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    ViewModule,
    UtilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
