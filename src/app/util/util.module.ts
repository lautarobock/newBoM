import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SessionService]
})
export class UtilModule { }
