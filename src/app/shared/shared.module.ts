import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskingSignupComponent } from './components/modal/asking-signup/asking-signup.component';



@NgModule({
  declarations: [
    AskingSignupComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[AskingSignupComponent]
})
export class SharedModule { }
